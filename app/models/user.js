'use strict';

var
  validator = rapp('lib/validator'),
  mongoose = rapp('lib/mongoose'),
  bcrypt = require('bcryptjs'),
  nconf = require('nconf'),
  debug = require('debug')('app:models:user'),
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
    default  : [ 'authenticated' ]
  },
  hashedPassword : {
    type     : String,
    required : true
  }
});

UserSchema.virtual('fullname').get(function () {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.methods.setPassword = function (password) {
  var self = this;
  return UserSchema.statics.hashPasswordQ(password).then(function (hashedPassword) {
    self.hashedPassword = hashedPassword;
  });
};

UserSchema.methods.hasRole = function (role) {
  return this.roles.indexOf(role) > -1;
};

UserSchema.statics.hashPasswordQ = function (password) {
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

UserSchema.methods.isPasswordQ = function (password) {
  debug('check if the `password` is set');

  if (bcrypt.compareSync(password, this.hashedPassword)) {
    debug('password is correct');
    return Q(true)
  } else {
    debug('password is incorrect');
    return Q.reject(new Error('პაროლი არ არის სწორი'));
  }
};

exports = module.exports = mongoose.model('User', UserSchema);
