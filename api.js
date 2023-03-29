const axios = require("axios");

// client_id and client_secret for our app

const client_id = "635e97b41a384a20bea1ce568b72c060";
const client_secret = "15064f1c13ff48ce9365868f162247e5";
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
