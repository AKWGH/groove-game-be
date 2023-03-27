const { fetchSongs } = require("../models/songsModel");

const getSongs = (req, res) => {
  const { genre } = req.params;
  fetchSongs(genre)
    .then((data) => {
      res.status(200).send(data); // sends the data to the user
    })
    .catch((err) => {
      res.status(404).send("genre not found"); // iff the genre isnt found, return a 404 to the user
    });
};

module.exports = { getSongs };
