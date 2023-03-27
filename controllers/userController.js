// models
const User = require('../models/userModel');

// controller for posting users to the database
const registerUser = (req, res) => {
  User.create(req.body)
    .then(() => res.status(201).send({ msg: 'user created' }))
    .catch((err) => {
      res.status(500).json({ msg: 'Sorry, something went wrong' });
    });
};

module.exports = { registerUser };
