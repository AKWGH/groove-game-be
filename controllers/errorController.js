const handleCustomErrors = (err, req, res, next) => {
  if (err === "user validation failed") {
    res.status(400).send({ msg: err });
  } else next(err);
};

const invalidPathError = (req, res, next) => {
  res.status(404).send({ msg: "Sorry, path not found" });
};

const handleServerError = (err, req, res, next) => {
  res.status(500).send({ msg: "Server Error" });
};

const apiErrorHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err.msg);
  } else {
    next(err);
  }
};

module.exports = {
  handleCustomErrors,
  handleServerError,
  invalidPathError,
  apiErrorHandler,
};
