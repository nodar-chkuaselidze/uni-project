'use strict';

var apiControllers = {},
    debug = require('debug')('app:controllers:api'),
    Test = rapp('models/test'),
    Solution = rapp('models/solution'),
    _ = require('lodash'),
    Q = require('q');

apiControllers.changePassword = function (req) {
  req.checkBody('oldPassword', 'ძველი და ახალი პაროლი ერთია').notEquals(req.body.newPassword);
  req.checkBody('newPassword', 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოთი').isLength(6);
  req.checkBody('newPassword', 'განმეორებითი პაროლი არ დაემთხვა').equals(req.body.repeatNewPassword);

  return req.validationErrorsQ().then(function () {
      return req.user.isPasswordQ(req.body.oldPassword);
    }).then(function () {
      return req.user.setPassword(req.body.newPassword);
    }).then(function () {
      return req.user.saveQ();
    }).then(function () {
      return 'პაროლი შეიცვალა';
    }).catch(function (errors) {
      switch (true) {
        case errors instanceof Error:
          errors = errors.message;
        case typeof errors === "string":
          errors = [ errors ];
          break;
        case errors instanceof Array:
          break;
        default:
          errors = [ 'პაროლის შეცვლა არ მოხერხდა' ];
      }

      return Q.reject({
        status : 400,
        list   : errors
      });
    });
};

apiControllers.addTest = function (req) {
  var testData = req.body,
      test;

  test = new Test();

  test.owner     = req.user.email;
  test.subject   = testData.subject;
  test.questions = testData.questions;
  test.createdAt = Date.now();
  test.deletedAt = null;
  test.maxScore  = testData.questions.reduce(function (prev, curr) {
      return prev + +curr.rightAnswer;
  }, 0);

  return test.saveQ().then(function () {
    return 'ტესტი შენახულია';
  }).catch(function (errors) {
    return Q.reject({
      status : 400,
      list   : errors
    });
  });
};

apiControllers.updateTest = function (req) {
  var testData = req.body;

  return Test.findOneQ({ _id : testData._id })
  .then(function (test) {
    test.subject   = testData.subject;
    test.questions = testData.questions;
    test.maxScore  = testData.questions.reduce(function (prev, curr) {
        return prev + +curr.rightAnswer;
    }, 0);

    return test.saveQ();
  })
  .then(function (test) {
    return 'ტესტი განახლდა';
  })
  .catch(function (errors) {
    return Q.reject({
      status : 400,
      list   : errors
    });
  });
};

apiControllers.saveSolution = function (req) {
  var data = req.body,
    testIdError = 'ტესტის ID არასწორია';

  req.checkBody('testId', testIdError).isHexadecimal().notEmpty();
  if (!data.answer) {
    data.answer = [];
  }

  return Test.findOneQ({ _id : data.testId })
  .then(function (test) {
    return Solution.checkAnswers(test.questions, data.answer);
  })
  .then(function (solutionResults) {
    var score  = solutionResults.score,
      answers  = solutionResults.answers,
      solution = new Solution;

    solution.testId    = req.body.testId;
    solution.ID        = req.body.ID;
    solution.firstName = req.body.firstname;
    solution.lastName  = req.body.lastname;
    solution.answers   = answers;
    solution.score     = score;
    solution.createdAt = Date.now();

    return solution.saveQ()
  })
  .then(function (saved) {
    return 'ტესტი წარმატებით გაიგზავნა, თქვენი ქულაა ' + saved.score;
  })
  .catch(function (error) {
    if (error.errors) {
      error.list = [];
      for(var key in error.errors) {
        error.list.push(error.errors[key].message);
      }

      error = {
        status : 400,
        list   : error.list
      };
    }

    if (error.name == 'MongoError' && error.code == 11000) {
      error = {
        status : 400,
        list   : [ 'თქვენ უკვე შეავსეთ ტესტი' ]
      };
    }

    return Q.reject({
      status : error.status,
      list   : error.list
    });
  });
};

exports = module.exports = apiControllers;
