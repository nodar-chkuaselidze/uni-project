'use strict';

//for custom validators
var validator = require('validator');

validator.extend('geoAlpha', function (str) {
  return /^[ა-ჰ]+$/.test(str);
});

exports = module.exports = validator;
