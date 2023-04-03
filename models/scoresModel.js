const mongoose = require("mongoose");

// model for posting scores to the database
const ScoresSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model("score", ScoresSchema);
