const rateLimit = require('express-rate-limit');
const LIMITER_ERROR = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: LIMITER_ERROR,
});

module.exports = limiter;
