const { spotifyToken } = require("../api");
const artistSeeds = require("../db/artistSeeds");
const axios = require("axios");

const fetchSongs = (genre) => {
  const songLimit = 20;
  // will fetch songs from the spotify API
  const artistNames = Object.keys(artistSeeds); // creating an array of genres hardcoded in artistSeeds.js
  if (!artistNames.includes(genre)) {
    return Promise.reject({
      status: 404,
      msg: `genre not found`, // if the genre in the req.params does not exist within the array, send a 404 back to the users
    });
  } else {
    return axios // a get request to the spotify API
      .get(
        `https://api.spotify.com/v1/recommendations?seed_artists=${artistSeeds[genre].artist_ids}&seed_genres=${artistSeeds[genre].genre_names}&seed_tracks=${artistSeeds[genre].track_ids}&limit=${songLimit}`,
        {
          headers: {
            "Content-Type": "application / json",
            Authorization: "Bearer " + spotifyToken.token, // the request includes the auth token
            Host: "api.spotify.com",
          },
        }
      )
      .then((response) => {
        return response.data; // returns the response back to the controller
      });
  }
};

module.exports = { fetchSongs };
