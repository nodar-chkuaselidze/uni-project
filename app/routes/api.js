'use strict';

var express = rapp('lib/express').express,
  router = express.Router(),
  apiMiddlewares = rapp('routes/middlewares/api'),
  apiControllers = rapp('controllers/api'),
  passport = rapp('lib/passport');

router.post('/change-password', apiMiddlewares.ensureAuth, function (req, res) {
  apiControllers.changePassword(req).then(function () {
    console.log('password should have changed');
    res.json(404, {});
  })
  .catch(function (error) {
    console.log('password should not have changed, we got errors');
    res.json(error.status, error.list);
  });
});


exports = module.exports = router;
