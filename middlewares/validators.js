const { celebrate, Joi } = require('celebrate');
const { isURL, isEmail } = require('validator');
const { URL_NOT_VALID, EMAIL_NOT_VALID } = require('../utils/constants');

const validateNewMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(URL_NOT_VALID);
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(URL_NOT_VALID);
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(URL_NOT_VALID);
    }),
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
    email: Joi.string().required().custom((value, helpers) => {
      if (isEmail(value)) {
        return value;
      }
      return helpers.message(EMAIL_NOT_VALID);
    }),
    name: Joi.string().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (isEmail(value)) {
        return value;
      }
      return helpers.message(EMAIL_NOT_VALID);
    }),
    password: Joi.string().required().min(8),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value, helpers) => {
      if (isEmail(value)) {
        return value;
      }
      return helpers.message(EMAIL_NOT_VALID);
    }),
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
