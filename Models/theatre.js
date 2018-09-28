const mongoose = require("mongoose");
const Joi = require("joi");

//Schema definition

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  movieTime: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies"
      },
      timings: [String]
    }
  ]
});
const Theatre = mongoose.model("Theatre", theatreSchema);
function validateTheatre(theatre) {
  const schema = {
    name: Joi.string().required(),
    address: Joi.string().required(),
    movieTime: Joi.array().items(
      Joi.object().keys({
        movieId: Joi.objectId(),
        time: Joi.string()
      })
    )
  };
  return Joi.validate(theatre, schema);
}
module.exports.validate = validateTheatre;
module.exports.Theatre = Theatre;
