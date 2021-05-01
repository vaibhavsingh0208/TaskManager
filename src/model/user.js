const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error('Please enter valid email address');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate: value => {
      if (value < 0) {
        throw new Error('Age must be a positive value');
      }
    }
  },
  password: {
    type: String,
    minLength: 6,
    trim: true,
    required: true,
    validate: value => {
      if (value.includes('password')) {
        throw new Error("Your password can't be password");
      }
    }
  }
});

module.exports = User;
