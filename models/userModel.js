const mongoose = require('mongoose');

// model for posting users to the database
const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide name'] },
  username: { type: String, required: [true, 'Please provide username'] },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
});

module.exports = mongoose.model('user', UserSchema);
