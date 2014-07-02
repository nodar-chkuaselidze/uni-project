'use strict';

//for custom validators
var validator = rapp('lib/express-validator').validator;

validator.extend('geoAlpha', function (str) {
  return /^[ა-ჰ]+$/.test(str);
});

validator.extend('notEquals', function (str, str2) {
  return !validator.equals(str, str2);
});

exports = module.exports = validator;
