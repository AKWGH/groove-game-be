const { fetchSongs } = require("../models/songsModel");

const getSongs = (req, res) => {
  const { genre } = req.params;
  fetchSongs(genre).then((data) => {
    res.status(200).send(data);
  });
};

module.exports = { getSongs };
