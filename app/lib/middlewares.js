'use strict';

var User = rapp('models/user');

exports.user  = {
  isAdmin : function (req, res, next) {
    req.isAdmin = req.isAuthenticated() && req.user.hasRole('admin');

    next();
  },
  isLecturer : function (req, res, next) {
    req.isLecturer = req.isAuthenticated() && req.user.hasRole('lecturer');

    next();
  }
};
