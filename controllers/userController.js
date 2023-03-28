const bcrypt = require("bcrypt");

// models
const User = require("../models/userModel");

// controller for posting users to the database
const registerUser = (req, res, next) => {
  const { name, username, password } = req.body; // capturing the request body
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    // adding random strings to the password
    bcrypt.hash(password, salt, function (err, hashedPassword) {
      // shuffling string characters
      User.create({ name, username, password: hashedPassword })
        .then(() => {
          if (!name || !username || !password) {
            Promise.reject("Sorry, please fill out all fields");
          }
          res.status(201).send({ msg: "user created" });
        })
        .catch((err) => {
          console.log(err);
          next(err._message);
        });
    });
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body; //Checks if user and password both exist
  if (!username || !password) {
    res.status(401).send({ msg: "Please fill out all fields." });
  }
  //Queries the database for username
  User.findOne({ username }).then((data) => {
    if (data) {
      const hash = data.password;
      bcrypt.compare(password, hash, function (err, result) {
        //Compares the hashed password and password
        //Andy - Try to send back correct data - Username and name
        if (result) {
          res.status(200).send("correct login");
        } else {
          //
          res.status(401).send("incorrect username or pasword");
        }
      });
    } else {
      res.status(401).send("incorrect username or password");
    }
  });
};

module.exports = { registerUser, loginUser };
