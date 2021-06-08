const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const { MOVIE_ERROR_MESSAGES, RESPONSE_OK } = require('../utils/constants');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(RESPONSE_OK).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(RESPONSE_OK).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(MOVIE_ERROR_MESSAGES.NO_CREATE);
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .orFail(new Error('NotFound'))
    .then((movie) => {
      if (movie) {
        return res.status(RESPONSE_OK).send({ message: MOVIE_ERROR_MESSAGES.DELETE_SUCCESS });
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new BadRequestError(MOVIE_ERROR_MESSAGES.NO_PERMISSION_DELETE_ERROR);
      }
      return movie;
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(MOVIE_ERROR_MESSAGES.NO_GENERAL_DELETE_ERROR);
      } if (err.message === 'NotFound') {
        throw new NotFoundError(MOVIE_ERROR_MESSAGES.NO_FOUND_ERROR);
      }
    })
    .catch(next);
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
