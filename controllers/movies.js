const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const RESPONSE_OK = 200;

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
    nameRU,
    ameEN,
    movieId,
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
    nameRU,
    ameEN,
    movieId,
    owner,
  })
    .then((movie) => {
      Movie.findById(movie._id)
        .populate('owner');
      res.status(RESPONSE_OK).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Cannot create a movie');
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .orFail(new Error('NotFound'))
    .then((movie) => {
      if (movie) {
        return res.status(RESPONSE_OK).send({ message: 'Movie was successfully deleted' });
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new BadRequestError('Sorry, you cannot delete moview created by other users');
      }
      return movie;
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Cannot find and delete a movie');
      } if (err.message === 'NotFound') {
        throw new NotFoundError('Cannot find a movie');
      }
    })
    .catch(next);
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
