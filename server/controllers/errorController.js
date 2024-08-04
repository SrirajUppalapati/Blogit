const handleDuplicateFieldsDB = (err) => {
  const value = Object.keys(err.keyValue)[0];
  return `This ${value} already exists.`;
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  return `Invalid input data. ${errors.join(". ")}`;
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  let error = {
    status: err.status,
  };

  if (err.statusCode === 500) {
    error.message = "Something went wrong!";
  }
  if (err.code === 11000) {
    error.message = handleDuplicateFieldsDB(err);
  } else if (error.name === "CastError") {
    error.message = `Invalid ${err.path}: ${err.value}.`;
  } else if (error.name === "ValidationError") {
    error.message = handleValidationErrorDB(err);
  } else if (error.name === "JsonWebTokenError") {
    error.message = "Invalid token. Please log in again!";
  } else if (error.name === "TokenExpiredError") {
    error.message = "Your token has expired! Please log in again!";
  } else {
    error.message = err.message;
  }
  console.error(err.stack);
  res.status(err.statusCode).json(error);
};
