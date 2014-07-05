'use strict';

var userController = {},
    mongoose = rapp('lib/mongoose'),
    Test = rapp('models/test'),
    Solution = rapp('models/solution'),
    debug = require('debug')('app:controllers:admin'),
    Q = require('q');

userController.getUserTests = function (req) {
  return Test.find({
    owner : req.user.email
  })
  .sort('-createdAt')
  .execQ();
};

userController.getTestById = function (req) {
  var error = 'ID არასწორია';

  req.checkParams('test_id', error).isHexadecimal();

  return req.validationErrorsQ()
  .then(function () {
    var id = req.params.test_id;

    return Test.findOneQ({ _id : id });
  })
  .catch(function (error) {
    return Q.reject({
      status : 404,
      error  : error
    });
  });
};

userController.getTestSolutions = function (test) {
  return Solution.find({ testId : new mongoose.Types.ObjectId(test._id) })
    .sort('-createdAt')
    .execQ()
    .then(function (solutions) {
      return {
        test : test,
        solutions : solutions
      };
    })
    .catch(function (error) {
      debug(error);

      return Q.reject({
        status : 500,
        error  : [ 'ტესტი არ მოიძებნა' ]
      });
    });
};

userController.removeTest = function (req) {
  return Test.removeQ({ _id : req.params.test_id });
};

exports = module.exports = userController;
