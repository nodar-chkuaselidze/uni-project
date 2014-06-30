'use strict';

var express = rapp('lib/express').express,
  router = express.Router(),
  middlewares = rapp('lib/middlewares'),
  passport = rapp('lib/passport');


router.route('/')
  .all()
  .get( middlewares.admin.isAdmin, function (req, res) {
    if (!req.isAdmin) {
      res.render('admin/login');
      return;
    }

    res.render('index', {
      pageTitle : 'It should get interesting'
    });
  })
  .post( passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function (req, res) {
    console.log('authenticate success');
    res.redirect('/?hello');
  });

module.exports = router;
