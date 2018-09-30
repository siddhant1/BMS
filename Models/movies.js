const mongoose = require("mongoose");
const Joi = require("joi");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ratings: {
    type: String
  },
  categories: [
    {
      type: String,
      required: true
    }
  ],
  languages: [
    {
      type: String,
      required: true
    }
  ],
  director: String,
  cast: [String]
});
const Movie = mongoose.model("movie", schema);
function validateMovie(movie) {
  const schema = {
    name: Joi.string().required(),
    ratings: Joi.string(),
    categories: Joi.array()
      .items(Joi.string())
      .required(),
    languages: Joi.array()
      .items(Joi.string())
      .required(),
    director: Joi.string().required(),
    cast: Joi.array()
      .items(Joi.string())
      .required()
  };
  return Joi.validate(movie, schema);
}
module.exports.Movie = Movie;
module.exports.validate = validateMovie;
