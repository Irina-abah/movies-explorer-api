const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const BadAuthError = require('../errors/bad-auth-error');
const AUTH_ERROR = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new BadAuthError(AUTH_ERROR);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new BadAuthError(AUTH_ERROR);
  }

  req.user = payload;
  next();
};
