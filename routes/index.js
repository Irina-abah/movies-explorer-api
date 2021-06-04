const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./users');
const { register, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server is down');
  }, 0);
});

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

router.use('/users', auth, userRoutes);
router.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

module.exports = router;
