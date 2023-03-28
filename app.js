// packages
const express = require("express");
const connectDB = require("./db/connect");
const axios = require("axios");

// controllers
const { registerUser, loginUser } = require("./controllers/userController");
const { getSongs } = require("./controllers/songsController");
const { postGame, getGame } = require("./controllers/gamesController");
const { tokenRefresh } = require("./api");

// allows access to env file
require("dotenv").config();

// initialises express server
const app = express();

// parses data to json
app.use(express.json());

// spotify token generation

tokenRefresh(); // this function is invoked on server startup
setInterval(tokenRefresh, 3.54e6); // the function invokes itself once every 59 minutes as the token expires automatically after an hour

// routes
app.post("/api/user", registerUser);
app.get("/api/user", loginUser);
app.get("/api/songs/:genre", getSongs);
app.get("api/games", getGame);
app.post("/api/games", postGame);

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err.msg);
  } else {
    next(err);
  }
});

const port = 9090;

// establishes connection with the database otherwise server fails to run
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = { app, start };
