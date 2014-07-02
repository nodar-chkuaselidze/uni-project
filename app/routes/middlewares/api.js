'use strict';

exports = module.exports = {
  ensureAuth : function (req, res, next) {
    if (!req.isAuthenticated() || !req.user) {
      res.json(403, {
        errors : [ 'თქვენ არ ხართ სისტემაში' ]
      });
      return;
    }

    next();
  }
};
