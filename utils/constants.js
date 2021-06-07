const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
// eslint-disable-next-line no-useless-escape
const URL_REGEX = /^https?:\/\/(www\.)*([a-z\d  \-]+\.[a-z]+)(\/?\w+)+/;

module.exports = {
  EMAIL_REGEX,
  URL_REGEX,
};
