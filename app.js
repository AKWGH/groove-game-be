// packages
const express = require("express");
const connectDB = require("./db/connect");
const axios = require("axios");

// error handling
const {
  handleCustomErrors,
  handleServerError,
  invalidPathError,
  apiErrorHandler,
  duplicateUserError,
} = require("./controllers/errorController");

// controllers
const { registerUser, loginUser } = require("./controllers/userController");
const { getSongs } = require("./controllers/songsController");
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

// error handling

// handles custom errors
app.use(handleCustomErrors);
// api error handler
app.use(apiErrorHandler);
// handles duplicate users
app.use(duplicateUserError);
// handles server errors
app.use(handleServerError);

const port = 5500;

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

//test

module.exports = { app, start };
