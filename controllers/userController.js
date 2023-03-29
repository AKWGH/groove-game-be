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
          next(err);
        });
    });
  });
};

const loginUser = (req, res, next) => {
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
          User.findOne({ username }).then((data) => {
            const { name, username, _id } = data;
            res.status(200).send({ name, username, _id });
          });
          // res.status(200).send("correct login");
        } else {
          res.status(401).send("incorrect username or pasword");
        }
      });
    } else {
      res.status(404).send("username not found");
    }
  });
};

const deleteUser = (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    res.status(401).send({ msg: "Please fill out all fields." });
  } else
    [
      User.findOne({ username }).then((data) => {
        if (data) {
          User.deleteOne({ username }).then(() => {
            res.status(200).send({ msg: "User deleted" });
          });
        } else {
          res.status(404).send({ msg: "Username does not exist" });
        }
      }),
    ];
};

module.exports = { registerUser, loginUser, deleteUser };
