const mongoose = require("mongoose");
const Joi = require("joi");

//Schema definition

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  seatCount: { type: Number, required: true }
});
const Theatre = mongoose.model("theatre", theatreSchema);
function validateTheatre(theatre) {
  const schema = {
    name: Joi.string().required(),
    address: Joi.string().required(),
    seatCount: Joi.number().required()
  };
  return Joi.validate(theatre, schema);
}
module.exports.validate = validateTheatre;
module.exports.Theatre = Theatre;
