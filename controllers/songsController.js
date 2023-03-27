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

module.exports = { getSongs };
