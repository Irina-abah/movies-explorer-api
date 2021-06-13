const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { register, login } = require('../controllers/users');
const { validateLogin, validateRegister } = require('../middlewares/validators');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const BadAuthError = require('../errors/bad-auth-error');
const { GENERAL_NO_FOUND_ERROR } = require('../utils/constants');
const { AUTH_ERR } = require('../utils/constants');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server is down');
  }, 0);
});

router.post('/signup', validateRegister, register);

router.post('/signin', validateLogin, login);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.use('*', auth, (res) => {
  if (res.statusCode === 401) {
    throw new BadAuthError(AUTH_ERR);
  } else {
    throw new NotFoundError(GENERAL_NO_FOUND_ERROR);
  }
});

module.exports = router;
