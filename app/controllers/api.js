'use strict';

var apiControllers = {},
    debug = require('debug')('app:controllers:api'),
    _ = require('lodash'),
    Q = require('q');

apiControllers.changePassword = function (req) {
  req.checkBody('oldPassword', 'ძველი და ახალი პაროლი ერთია').notEquals(req.body.newPassword);
  req.checkBody('newPassword', 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოთი').isLength(6);
  req.checkBody('newPassword', 'განმეორებითი პაროლი არ დაემთხვა').equals(req.body.repeatNewPassword);

  debug('make password validations');
  return req.validationErrorsQ().then(function () {
      debug('Check if password is okay');

      return req.user.isPasswordQ(req.body.oldPassword);
    }).then(function () {
      console.log('somewhere here');
    }).catch(function (errors) {
      debug('We found error');

      switch (true) {
        case errors instanceof Error:
          errors = errors.message;
        case typeof errors === "string":
          errors = [ errors ];
      }

      return Q.reject({
        status : 400,
        list   : errors
      });
    });
};

exports = module.exports = apiControllers;
