const { celebrate, Joi } = require('celebrate');

const { EMAIL_REGEX, URL_REGEX } = require('../utils/constants');

const validateNewMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    trailer: Joi.string().required().regex(URL_REGEX),
    thumbnail: Joi.string().required().regex(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }).unknown(true),
});

const validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(EMAIL_REGEX),
    name: Joi.string().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(EMAIL_REGEX),
    password: Joi.string().required().min(8),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email().regex(EMAIL_REGEX),
    password: Joi.string().required().min(8),
  }),
});

module.exports = {
  validateNewMovie,
  validateDeleteMovie,
  validateUpdateUserInfo,
  validateLogin,
  validateRegister,
};
