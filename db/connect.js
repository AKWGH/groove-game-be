const mongoose = require('mongoose');

// connects to the mongoDB database
const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
