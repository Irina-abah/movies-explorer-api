const MOVIE_ERROR_MESSAGES = {
  NO_FOUND_ERROR: 'Cannot find a movie',
  NO_GENERAL_DELETE_ERROR: 'Cannot find and delete a movie',
  NO_PERMISSION_DELETE_ERROR: 'Sorry, you cannot delete moview created by other users',
  NO_CREATE: 'Cannot create a movie',
  DELETE_SUCCESS: 'Movie was successfully deleted',
};

const USER_ERROR_MESSAGES = {
  NO_FOUND_ERROR: 'User profile not found',
  UNIQUE_EMAIL_ERROR: 'Current email has already been registered. Try again',
  NO_UPDATE_ERROR: 'Cannot update user information',
  INCORRECT_DATA_ERROR: 'Incorrect email or password',
  REGISTRATION_ERROR: 'Error during user registration',
};

const GENERAL_NO_FOUND_ERROR = 'Website not found';
const AUTH_ERROR = 'Authorization required';
const SERVER_ERROR = 'Sorry, server error';
const LIMITER_ERROR = 'Too many requests, please try again later';

const URL_NOT_VALID = 'URL is not valid';
const EMAIL_NOT_VALID = 'Incorrect email';

module.exports = {
  MOVIE_ERROR_MESSAGES,
  USER_ERROR_MESSAGES,
  GENERAL_NO_FOUND_ERROR,
  AUTH_ERROR,
  SERVER_ERROR,
  LIMITER_ERROR,
  URL_NOT_VALID,
  EMAIL_NOT_VALID,
};
