const Games = require("../models/gamesModel");
const User = require("../models/userModel");

const postGame = (req, res, next) => {
  const { game } = req.body; // storing the game object from the request in a variable
  if (!game) {
    res
      .status(401)
      .send({ msg: "The body of this request is not formatted correctly." });
  } else {
    const { user, songs } = game;
    if (!user || !songs) {
      res
        .status(401)
        .send({ msg: "The body of this request is not formatted correctly." });
    } else {
      User.findOne({ username: user }).then((data) => {
        if (data) {
          Games.create({ game: { user, songs } }) // creating the game within the GamesSchema
            .then(() => {
              res.status(201).send({ msg: "Game created" }); // send a sucess message if the creation of the game is sucessfull
            })
            .catch((err) => {
              next(err); // if err, pass to error handling middleware
            });
        } else {
          res.status(404).send({ msg: "User is not found" });
        }
      });
    }
  }
};

const getGame = (req, res, next) => {
  const { username } = req.body; // storing the username from the request body in a variable
  Games.find({ "game.user": username }) // searching Games for games with the associated user
    .then((data) => {
      console.log("test");
      res.status(200).send(data); // sending games back to the user
    })
    .catch((err) => {
      next(err); // if err, pass to error handling middleware
    });
};

module.exports = { postGame, getGame };
