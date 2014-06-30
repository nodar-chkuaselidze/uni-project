'use strict';

var passport = require('passport'),
    LocalStategy = require('passport-local').Strategy;

passport.use(new LocalStategy({
  passReqToCallback : true,
  usernameField : 'email',
  passwordField : 'password'
}, function (req, username, password, verify) {
  console.log(username + ' . ' + password);

  verify('Error found');
}));

exports = module.exports = passport;
