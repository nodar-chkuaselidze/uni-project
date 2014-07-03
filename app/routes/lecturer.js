'use strict';

var express = rapp('lib/express').express,
  router = express.Router(),
  userMiddlewares = rapp('routes/middlewares/user'),
  userControllers = rapp('controllers/user'),
  passport = rapp('lib/passport');


router.route('/')
  .all()
  .get(userMiddlewares.isLecturer, function (req, res) {
    if (req.isAuthenticated() && req.isLecturer === false) {
      req.flash('error', 'თქვენ არ გაქვთ ლექტორის უფლებები');
    }

    if (req.isLecturer === false) {
      res.render('admin/login');
      return;
    }

    res.render('admin/index', {
      pageTitle : 'მთავარი პანელი'
    });
  })
  .post(passport.authenticate('local', {
    successRedirect : '/lecturer/',
    failureRedirect: '/lecturer/',
    failureFlash: true
  }));

router.get('/tests', userMiddlewares.checkLecturer, function (req, res) {
  userControllers
  .getUserTests(req)
  .then(function (tests) {
    if (tests === null) {
      tests = [];
    }

    console.log(tests);
    res.render('admin/tests', {
      pageTitle : 'ტესტები',
      tests     : tests
    });
  }).catch(function (error) {
    res.end(500);
  });
});

router.get('/password-change', userMiddlewares.checkLecturer, function (req, res) {
  res.render('admin/change-password', {
    pageTitle : 'შეცვალეთ პაროლი'
  });
});

router.get('/logout', userMiddlewares.checkLecturer, function (req, res) {
  req.logOut();
  res.redirect('/lecturer/');
});

module.exports = router;
