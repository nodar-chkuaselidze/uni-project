'use strict';

var apiControllers = {},
    debug = require('debug')('app:controllers:api'),
    Test = rapp('models/test'),
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

apiControllers.addTests = function (req) {
  var testData = req.body,
      test;

  test = new Test();

  test.owner     = req.user.email;
  test.subject   = testData.subject;
  test.maxScore  = testData.maxScore;
  test.questions = testData.list;
  test.createdAt = Date.now();
  test.deletedAt = null;

  return test.saveQ().then(function () {
    return 'ტესტი შენახულია';
  }).catch(function (errors) {
    return Q.reject({
      status : 400,
      list   : errors
    });
  });
};

apiControllers.saveSolution = function (req) {
  var data = req.body;

  return Q.reject({
    status : 400,
    list   : [ 'Not Implemented Yet' ]
  });
};

exports = module.exports = apiControllers;
