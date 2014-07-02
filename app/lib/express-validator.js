'use strict';

var expressValidator = require('express-validator'),
    Q = require('q');

expressValidator.Q = function (req) {
  req.validationErrorsQ = function () {
    var errors = req.validationErrors();

    if (errors) {
      return Q.reject({
        status : 400,
        list   : errors
      });
    } else {
      return Q.resolve();
    }
  };
};

exports = module.exports = expressValidator;
