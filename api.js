const axios = require("axios");
require("dotenv").config();
// client_id and client_secret for our app

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
let spotifyToken = {
  token: "", // variable to store the token we recieve back from spotify
};

const tokenRefresh = () => {
  axios
    .post("https://accounts.spotify.com/api/token", null, {
      // a post request is made to spotify for a token/auth0 key
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"), // the body of the request contains the client_id and the client_secret provided by
        "Content-Type": "application/x-www-form-urlencoded", // spotify for our app
      },
      params: {
        grant_type: "client_credentials",
      },
    })
    .then((res) => {
      spotifyToken.token = res.data.access_token; // the spotifyToken variable is updated with the token we recieve back from spotify
    });
};

module.exports = { tokenRefresh, spotifyToken };
