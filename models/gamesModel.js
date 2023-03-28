const mongoose = require("mongoose");

// model for posting games to the database
const GamesSchema = new mongoose.Schema({
  game: {
    user: { type: String, required: [true, "Please provide a username"] }, // user references the UserSchema
    songs: {
      track_id: { type: String, required: [true, "Please provide a track id"] }, // the songs object requires track_id's
    },
  },
});

module.exports = mongoose.model("Games", GamesSchema);
