'use strict';

var userControllers = {},
    Test = rapp('models/test'),
    debug = require('debug')('app:controllers:admin'),
    Q = require('q');

userControllers.getUserTests = function (req) {
  return Test.findQ({
    owner : req.user.email
  })
};

exports = module.exports = userControllers;
