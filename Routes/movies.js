const router = require("express").Router();
const { Movie, validate } = require("../Models/movies");
const ObjectId = require("mongoose").Types.ObjectId;
// Get all movies
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

//Get a specfic movie
router.get("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid Movie Request");
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("No movie found");
  res.send(movie);
});

//post a movie
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const movie = new Movie({
    name: req.body.name,
    categories: req.body.categories,
    languages: req.body.languages,
    ratings: req.body.ratings,
    director: req.body.director,
    cast: req.body.cast
  });
  await movie.save();
  res.send(movie);
});

//Update a movie

router.put("/:id", async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid Movie Request");
  ``;
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        categories: req.body.categories,
        languages: req.body.languages,
        ratings: req.body.ratings,
        director: req.body.director,
        cast: req.body.cast
      }
    },
    { new: true }
  );
  if (!movie) return res.status(404).send("Movie Not found");
  res.send(movie);
});

module.exports = router;
