const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = require('.././config/config')(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 80
  },
  token: {
    type: String
  }
});

userSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_I, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }

});

userSchema.methods.comparePassword = function (plainPasswordFromUser, callback) {
  let user = this;
  let hashedPasswordFromDB = user.password;

  bcrypt.compare(plainPasswordFromUser, hashedPasswordFromDB, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  })
};

userSchema.methods.generateToken = function (callback) {
  let user = this;
  let token = jwt.sign(user._id.toString(), SECRET_KEY);
  user.token = token;

  user.save((err, user) => {
    if (err) return callback(err);
    return callback(null, user);
  });
};

userSchema.statics.findByToken = function (tokenFromBrowserCookie, callback) {
  let User = this;

  jwt.verify(tokenFromBrowserCookie, SECRET_KEY, (err, decode) => {
    User.findOne({_id: decode, token: tokenFromBrowserCookie}, (err, user) => {
      if (err) return callback(err);
      return callback(null, user);
    })
  })
};

userSchema.methods.deleteToken = function (token, callback) {
  let user = this;

  user.update({$unset: {token: 1}}, (err, user) => {
    if (err) return callback(err);
    return callback(null, user);
  })
};

const User = mongoose.model('User', userSchema);
module.exports = User;