'use strict';

//for custom validators
var validator = rapp('lib/express-validator').validator;

validator.extend('geoAlpha', function (str) {
  return /^[ა-ჰ]+$/.test(str);
});

validator.extend('notEmpty', function (str) {
  return str && str.length > 0;
});

validator.extend('isPersonId', function (str) {
  return validator.isNumeric(str) && str.length === 11;
});

validator.extend('notEquals', function (str, str2) {
  return !validator.equals(str, str2);
});

exports = module.exports = validator;
