'use strict';

exports = module.exports = {
  ensureAuth : function (req, res, next) {
    if (!req.isAuthenticated() || !req.user) {
      res.json(403, {
        errors : [ 'თქვენ არ გაქვთ სათანადო უფლება' ]
      });
      return;
    }

    next();
  },
  checkLecturer : function (req, res, next) {
    if (!req.isAuthenticated() || !req.user || !req.user.hasRole('lecturer')) {
      res.json(403, {
        errors : [ 'თქვენ არ გაქვთ სათანადო უფლება' ]
      });
      return;
    }

    next();
  }
};
