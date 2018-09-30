const router = require("express").Router();
const { validate, Theatre } = require("../Models/theatre");
const ObjectId = require("mongoose").Types.ObjectId;

//Get all theatres

router.get("/", async (req, res) => {
  const theatres = await Theatre.find();
  res.send(theatres);
});

//Get a single theatre

router.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid theatre id");
  const theatre = await Theatre.find({ _id: req.params.id });
  if (!theatre) return res.status(404).send("Theatre Not found");
  res.send(theatre);
});

//Post a theatre

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid theatre id");
  const theatre = new Theatre({
    name: req.body.name,
    address: req.body.address,
    seatCount: req.body.seatCount
  });
  await theatre.save();
  res.send(theatre);
});

//Put in a theatre

router.put("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("invalid theatre id");
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const theatre = await Theatre.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
        seatCount: req.body.seatCount
      }
    },
    { new: true }
  );
  if (!theatre) return res.status(404).send("Theatre Not Found");
  res.status(200).send(theatre);
});

module.exports = router;
