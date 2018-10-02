const mongoose = require("mongoose");
const Joi = require("joi");

const premiereSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie"
  },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: "theatre" },
  seatsBooked: [[Number]]
});

const Premiere = mongoose.model("premiere", premiereSchema);

function validatePremiere(premiere) {
  const schema = {
    date: Joi.date().required(),
    movie: Joi.objectId().required(),
    theatre: Joi.objectId().required(),
    seatsBooked: Joi.array().items(Joi.array().items(Joi.number()))
  };
  return Joi.validate(premiere, schema);
}
exports.validate = validatePremiere;
exports.Premiere = Premiere;
