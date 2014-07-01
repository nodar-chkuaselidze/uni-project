'use strict';

var express = rapp('lib/express').express,
  router = express.Router(),
  middlewares = rapp('lib/middlewares'),
  passport = rapp('lib/passport');


router.route('/')
  .all()
  .get(middlewares.user.isLecturer, function (req, res) {
    if (req.isAuthenticated() && req.isLecturer === false) {
      req.flash('error', 'თქვენ არ გაქვთ ლექტორის უფლებები');
    }

    if (req.isLecturer === false) {
      res.render('admin/login');
      return;
    }

    res.render('admin/index', {
      pageTitle : 'მთავარი პანელი',
      user : req.user
    });
  })
  .post(passport.authenticate('local', {
    successRedirect : '/lecturer/',
    failureRedirect: '/lecturer/',
    failureFlash: true
  }));

router.get('/logout', middlewares.user.checkLecturer, function (req, res) {
  req.logOut();
  req.redirect('/lecturer/');
});

module.exports = router;
