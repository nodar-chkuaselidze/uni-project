'use strict';

var User = rapp('models/user');

exports.user  = {
  reqAdmin : function (req, res, next) {
    if (req.isAuthenticated() && !req.user.hasRole('admin')) {
      req.flash('error', 'თქვენ არ გაქვთ ადმინისტრატორის უფლებები');
      res.redirect('/lecturer/');
    }
  },

  checkLecturer : function (req, res, next) {
    if (req.isAuthenticated() && !req.user.hasRole('lecturer')) {
      req.flash('error', 'თქვენ არ გაქვთ ლექტორის უფლებები');
      res.redirect('/');
    } else {
      next();
    }
  },
  isAdmin : function (req, res, next) {
    req.isAdmin = req.isAuthenticated() && req.user.hasRole('admin');

    next();
  },
  isLecturer : function (req, res, next) {
    req.isLecturer = req.isAuthenticated() && req.user.hasRole('lecturer');

    next();
  }
};
