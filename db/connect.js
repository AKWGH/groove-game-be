const mongoose = require('mongoose');

// connects to the mongoDB database
const connectDB = () => {
  // checks if we need to use testing connection or normal database
  const dbConnection =
    process.env.NODE_ENV === 'test'
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI;

  return mongoose.connect(dbConnection);
};

module.exports = connectDB;
