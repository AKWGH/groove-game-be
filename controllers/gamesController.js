const Games = require("../models/gamesModel");

const postGame = (req, res, next) => {
  const { game } = req.body; // storing the game object from the request in a variable
  Games.create({ user: game.user, songs: game.songs }) // creating the game within the GamesSchema
    .then(() => {
      res.status(201).send({ msg: "Game created" }); // send a sucess message if the creation of the game is sucessfull
    })
    .catch((err) => {
      next(err); // if err, pass to error handling middleware
    });
};

const getGame = (req, res, next) => {
  const { username } = req.body; // storing the username from the request body in a variable
  Games.find({ username }) // searching Games for games with the associated user
    .then((data) => {
      res.status(200).send(data); // sending games back to the user
    })
    .catch((err) => {
      next(err); // if err, pass to error handling middleware
    });
};

module.exports = { postGame, getGame };
