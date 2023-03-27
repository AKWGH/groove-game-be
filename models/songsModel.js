const { spotifyToken } = require("../api");
const artistSeeds = require("../db/artistSeeds");
const axios = require("axios");

const fetchSongs = (genre) => {
  return axios
    .get(
      `https://api.spotify.com/v1/recommendations?seed_artists=${artistSeeds[genre].artist_ids}&seed_genres=${artistSeeds[genre].genre_names}&seed_tracks=${artistSeeds[genre].track_ids}&limit=5`,
      {
        headers: {
          "Content-Type": "application / json",
          Authorization: "Bearer " + spotifyToken.token,
          Host: "api.spotify.com",
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { fetchSongs };
