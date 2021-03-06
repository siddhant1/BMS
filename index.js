require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Joi = require("joi");
const mogran = require("morgan");
Joi.objectId = require("joi-objectid")(Joi);
const helmet = require("helmet");
app.use(express.json());
app.use(helmet());
app.use(helmet.noCache());
app.use(mogran("tiny"));

//User defined routes
const movie = require("./Routes/movies");
const theatre = require("./Routes/theatre");
const premiere = require("./Routes/premiere");

//Connect to mongoose

mongoose
  .connect(
    `mongodb://${process.env.db_username}:${
      process.env.db_password
    }@ds115553.mlab.com:15553/bookmyshow`
  )
  .then(() => console.log("Connected to mlab"))
  .catch(err => console.log(err));
app.use("/api/movies", movie);
app.use("/api/theatres", theatre);
app.use("/api/premieres", premiere);

//Connect to server
app.listen(3000, () => console.log("Connected to server"));
