'use strict';

var expressValidator = require('express-validator'),
    debug = require('debug')('lib:express-validator'),
    Q = require('q');

expressValidator.Q = function (req) {
  debug('create validationErrorsQ method on request');
  req.validationErrorsQ = function () {
    debug('validation was requested');
    var errors = req.validationErrors();

    if (errors) {
      debug('validation found errors');
      return Q.reject(errors);
    } else {
      debug('validation passed');
      return Q(true);
    }
  };
};

exports = module.exports = expressValidator;
