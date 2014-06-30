'use strict';

var
  validator = rapp('lib/validator'),
  mongoose = rapp('lib/mongoose'),
  bcrypt = require('bcryptjs'),
  nconf = require('nconf'),
  Q = require('q'),

UserSchema = new mongoose.Schema({
  email : {
    unique   : true,
    type     : String,
    required : true,
    validate : [validator.isEmail, 'e-mail არასწორია']
  },
  firstName : {
    type     : String,
    required : true,
    validate : [validator.geoAlpha, 'გამოიყენეთ მხოლოდ ქართული სიმბოლოები']
  },
  lastName : {
    type     : String,
    required : true,
    validate : [validator.geoAlpha, 'გამოიყენეთ მხოლოდ ქართული სიმბოლოები']
  },
  roles : {
    type     : Array,
    required : true,
    select   : false,
    default  : [ 'authenticated' ]
  },
  hashedPassword : {
    type     : String,
    required : true,
    select   : false
  }
});

UserSchema.virtual('fullname').get(function () {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('password').set(function (password) {
  var self = this;
  UserSchema.statics.hashPassword(password).then(function (hashedPassword) {
    self.hashedPassword = hashedPassword;
  });
});

UserSchema.statics.hashPassword = function (password) {
  var deferred = Q.defer();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return deferred.reject(new Error(err));
    }

    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        return deferred.reject(new Error(err));
      }

      deferred.resolve(hash);
    });
  });

  return deferred.promise;
};

exports = module.exports = mongoose.model('User', UserSchema);
