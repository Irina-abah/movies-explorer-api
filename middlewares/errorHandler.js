const SERVER_ERROR = require('../utils/constants');

const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).send({
    error: {
      status: error.statusCode || 500,
      message: error.message || SERVER_ERROR,
    },
  });
  next();
};

module.exports = errorHandler;
