'use strict';

var passport = require('passport'),
    LocalStategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    debug = require('debug')('lib:passport'),
    User  = rapp('models/user');

passport.use(new LocalStategy({
  passReqToCallback : true,
  usernameField : 'email',
  passwordField : 'password'
}, function (req, email, password, next) {
  User.findOneQ({
    email     : req.body.email,
    firstName : req.body.firstname,
    lastName  : req.body.lastname
  }, {
    email : true,
    firstName : true,
    lastName : true,
    roles : true,
    hashedPassword : true
  }).then(function (user) {
    var message = 'ინფორმაცია არასწორია';

    if (user && bcrypt.compareSync(password, user.hashedPassword)) {
      next(null, user);
    } else {
      next(null, false, { message : message });
    }
  }).fail(function (error) {
    if (error) {
      debug(error);
    }

    next('Server Error');
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOneQ({ _id : id })
    .then(function (user) {
      done(null, user);
    })
    .fail(function (error) {
      done(error);
    });
});

exports = module.exports = passport;
