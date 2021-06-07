const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { register, login } = require('../controllers/users');
const { validateLogin, validateRegister } = require('../middlewares/validators');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server is down');
  }, 0);
});

router.post('/signup', validateRegister, register);

router.post('/signin', validateLogin, login);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

module.exports = router;
