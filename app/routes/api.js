'use strict';

var express = rapp('lib/express').express,
  router = express.Router(),
  apiMiddlewares = rapp('routes/middlewares/api'),
  passport = rapp('lib/passport');

router.post('/change-password', apiMiddlewares.ensureAuth, function (req, res) {
  res.json(404, {});
});


exports = module.exports = router;
