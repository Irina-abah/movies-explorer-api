const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getAllMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().regex(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/),
    name: Joi.string().min(2).max(30),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().required().length(24),
  }).unknown(true),
}), deleteMovie);

module.exports = router;
