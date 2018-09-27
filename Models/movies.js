const mongoose = require("mongoose");
const Joi = require("joi");
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  ]
});
const Movie = mongoose.model("movies", schema);
function validateMovie(movie) {
  const schema = {
    name: Joi.string().required(),
    categories: Joi.array.items(Joi.string()).required(),
    languages: Joi.array.items(Joi.string()).required()
  };
  return Joi.validate(movie, schema);
}
module.exports.Movie = Movie;
module.exports.validate = validateMovie;