const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Incorrect email'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Username',
  },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
