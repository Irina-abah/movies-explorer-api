require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const BadAuthError = require('../errors/bad-auth-error');
const { USER_ERROR_MESSAGES } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const register = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(USER_ERROR_MESSAGES.UNIQUE_EMAIL_ERROR);
      } else {
        throw err;
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new BadAuthError(USER_ERROR_MESSAGES.INCORRECT_DATA_ERROR);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new BadAuthError(USER_ERROR_MESSAGES.INCORRECT_DATA_ERROR);
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
          res.send({ token });
        })
        .catch(next);
    });
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .orFail(new NotFoundError(USER_ERROR_MESSAGES.NO_FOUND_ERROR))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(USER_ERROR_MESSAGES.NO_UPDATE_ERROR);
      }
      throw err;
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  register,
  login,
  updateUserInfo,
};
