const mongoose = require("mongoose");

// model for posting users to the database
const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide name"] },
  username: { type: String, required: [true, "Please provide username"] },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  games: [{ type: Schema.Types.ObjectId, ref: "Games" }], // should references the Games schema
});

module.exports = mongoose.model("user", UserSchema);
