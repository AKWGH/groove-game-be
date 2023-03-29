const { fetchSongs } = require("../models/songsModel");

const getSongs = (req, res, next) => {
  const { genre } = req.params;
  fetchSongs(genre)
    .then((data) => {
      res.status(200).send(data); // sends the data to the user
    })
    .catch((err) => {
      next(err);
    });
};

const getGenres = (req, res, next) => {
  const genreList = {
    genres: ["pop", "rock", "jazz", "hip_hop", "edm", "indie"],
  };
  res.status(200).send(genreList);
};

module.exports = { getSongs, getGenres };
