const {
  NODE_ENV = 'development',
  JWT_SECRET,
  PORT = 3000,
  DB_HOST = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const databaseParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  DB_HOST,
  NODE_ENV,
  JWT_SECRET,
  PORT,
  databaseParams,
};
