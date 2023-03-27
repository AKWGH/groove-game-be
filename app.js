// packages
const express = require('express');
const connectDB = require('./db/connect');

// controllers
const { registerUser } = require('./controllers/userController');

// allows access to env file
require('dotenv').config();

// initialises express server
const app = express();

// parses data to json
app.use(express.json());

// routes
app.post('/api/user', registerUser);

const port = 9090;

// establishes connection with the database otherwise server fails to run
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
