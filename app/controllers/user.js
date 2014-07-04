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

userControllers.getTestById = function (req) {
  var error = 'ID არასწორია';

  req.checkParams('test_id', error).isHexadecimal();

  return req.validationErrorsQ()
  .then(function () {
    var id = req.params.test_id;

    return Test.findQ({ _id : id });
  })
  .catch(function (error) {
    return Q.reject({
      status : 404,
      error  : error
    });
  });
};

exports = module.exports = userControllers;
