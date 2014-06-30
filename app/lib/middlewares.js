'use strict';

var User = rapp('models/user');

exports.user  = {
};

exports.admin = {
  isAdmin : function (req, res, next) {
    req.isAdmin = req.isAuthenticated() && req.user.hasRole('admin');

    next();
  }
};
