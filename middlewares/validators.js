const { celebrate, Joi } = require('celebrate');

const { EMAIL_REGEX } = require('../utils/constants');

const validateNewMovie = celebrate({
  body: Joi.object().keys({
    country: ,
    director: ,
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
    name: Joi.string().min(2).max(30),
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
