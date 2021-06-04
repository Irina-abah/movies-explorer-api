const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUser, register, login, updateUserInfo,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
    name: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
    password: Joi.string().required().min(8),
  }),
}), register);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
    password: Joi.string().required().min(8),
  }),
}), login);

module.exports = router;
