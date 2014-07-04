'use strict';

var express = rapp('lib/express').express,
  router = express.Router(),
  apiMiddlewares = rapp('routes/middlewares/api'),
  apiControllers = rapp('controllers/api'),
  passport = rapp('lib/passport');

router.post('/change-password', apiMiddlewares.ensureAuth, function (req, res) {
  apiControllers.changePassword(req)
  .then(function (text) {
    res.json(200, { message : text });
  })
  .catch(function (error) {
    if (!error.status || !error.list) {
      res.json(404, {});
      return;
    }

    res.json(error.status, error.list);
  });
});

router.post('/add-test', apiMiddlewares.checkLecturer, function (req, res) {
  apiControllers.addTests(req);

  res.json(404, {});
});


exports = module.exports = router;
