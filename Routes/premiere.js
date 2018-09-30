const router = require("express").Router();
const ObjectId = require("mongoose").Types.ObjectId;
const { validate, Premiere } = require("../Models/premiere");

//GET REQUEST

router.get("/", async (req, res) => {
  const premiere = await Premiere.find();
  return premiere;
});

//POST A NEW PREMIERE
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(400).send(error.details[0].message);
  const premiere = new Premiere({
    date: req.body.date,
    movie: req.body.movie,
    theatre: req.body.theatre,
    seatsBooked: req.body.seatsBooked
  });
  await premiere.save();
  res.status(200).send(premiere);
});

// Put a new Premiere

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(400).send(error.details[0].message);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("Invalid Premiere id");
  const premiere = Premiere.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        date: req.body.date,
        movie: req.body.movie,
        theatre: req.body.theatre,
        seatsBooked: req.body.seatsBooked
      }
    },
    { new: true }
  );
  if (!premiere) return res.status(404).send("No premiere found");
  res.status(202).send(premiere);
});
