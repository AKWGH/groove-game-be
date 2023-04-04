const Score = require("../models/scoresModel");

const postScore = (req, res) => {
  const { username, score } = req.body;
  Score.create({ username, score }).then(() => {
    return res.status(201).send({ msg: `score posted : ${req.body.score}` });
  });
};

const getScore = (req, res) => {
  Score.find()
    .sort({ score: -1 })
    .then((data) => {
      res.status(200).send({ data });
    });
};

module.exports = { postScore, getScore };
