const router = require('express').Router();

const { validateNewMovie, validateDeleteMovie } = require('../middlewares/validators');

const {
  getAllMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getAllMovies);

router.post('/', validateNewMovie, createMovie);

router.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = router;
