const router = require("express").Router();
const { validate, Theatre } = require("../Models/theatre");

//Get all theatres

router.get("/", async (req, res) => {
  const theatres = await Theatre.find().populate({
    path: "movieTime",
    populate: {
      path: movie,
      model: Movie
    }
  });
  res.send(theatres);
});

//Get a single theatre

router.get("/:id", async (req, res) => {
  const theatre = await Theatre.find({ _id: req.params.id }).populate({
    path: "movieTime",
    populate: {
      path: movie,
      model: Movie
    }
  });
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
  const theatre = new Theatre({
    name: req.body.name,
    address: req.body.address,
    movieTime: req.body.MovieTime
  });
  await theatre.save();
  res.send(theatre);
});

//Put in a theatre

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const theatre = await Theatre.findByIdAndUpdate(
    req.params.body,
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
        movieTime: req.body.MovieTime
      }
    },
    { new: true }
  );
  if (!theatre) return res.status(404).send("Movie Not Found");
  res.status(200).send(theatre);
});

module.exports = router;
