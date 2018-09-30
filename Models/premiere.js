const mongoose = require("mongoose");
const Joi = require("joi");

const premiereSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies"
  },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: "theatres" },
  seatsBooked: [[Number]]
});

const Premiere = mongoose.model("premiere", premiereSchema);

function validatePremiere(premiere) {
  const schema = {
    date: Joi.date().required(),
    movie: Joi.ObjectId().required(),
    theatre: Joi.ObjectId().required(),
    seatsBooked: Joi.array().items(Joi.array().items(Joi.number()))
  };
  return Joi.validate(premiere, schema);
}
exports.validate = validatePremiere;
exports.Premiere = Premiere;
