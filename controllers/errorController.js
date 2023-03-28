const handleCustomErrors = (err, req, res, next) => {
  if (err._message === "user validation failed") {
    res.status(400).send({ msg: err._message });
  } else next(err);
};

const apiErrorHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err.msg);
  } else {
    next(err);
  }
};

const duplicateUserError = (err, req, res, next) => {
  if (err.code === 11000) {
    res.status(401).send({ msg: "user already exists" });
  } else {
    next(err);
  }
};

const handleServerError = (err, req, res, next) => {
  if (err.status === 500) {
    res.status(500).send({ msg: "Server Error" });
  } else {
    next(err);
  }
};

module.exports = {
  handleCustomErrors,
  handleServerError,
  apiErrorHandler,
  duplicateUserError,
};
