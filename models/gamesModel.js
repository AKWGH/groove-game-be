const mongoose = require("mongoose");

// model for posting games to the database
const GamesSchema = new mongoose.Schema({
  game: {
    user: { type: String, required: [true, "Please provide a username"] }, // user references the UserSchema
    songs: { type: Array, required: [true, "Please provide track ids"] }, // the songs object requires track_id's
  },
});

module.exports = mongoose.model("Games", GamesSchema);
