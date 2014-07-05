'use strict';

var express = rapp('lib/express').express,
  router = express.Router(),
  userMiddlewares = rapp('routes/middlewares/user'),
  userController = rapp('controllers/user'),
  moment = require('moment'),
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

    userController
    .getUserTests(req)
    .then(function (tests) {
      if (tests === null) {
        tests = [];
      }

      res.render('admin/tests', {
        pageTitle : 'ტესტები',
        tests     : tests,
        moment    : moment
      });
    }).catch(function (error) {
      res.end(500);
    });
  })
  .post(passport.authenticate('local', {
    successRedirect : '/lecturer/',
    failureRedirect: '/lecturer/',
    failureFlash: true
  }));

router.get('/password-change', userMiddlewares.checkLecturer, function (req, res) {
  res.render('admin/change-password', {
    pageTitle : 'შეცვალეთ პაროლი'
  });
});

router.get('/logout', userMiddlewares.checkLecturer, function (req, res) {
  req.logOut();
  res.redirect('/lecturer/');
});


router.get('/test/remove/:test_id/', userMiddlewares.checkLecturer, function (req, res) {
  console.log('remove test');
  userController.removeTest(req)
  .then(function (test) {
    res.redirect('/lecturer/');
  })
  .catch(function (error) {
    debug(error);
    res.redirect('/lecturer/');
  });
});

router.get('/test/:test_id/', userMiddlewares.checkLecturer, function (req, res) {
  userController.getTestById(req)
  .then(function (test) {
    return userController.getTestSolutions(test);
  })
  .then(function (result) {
    var test = result.test,
      solutions = result.solutions;

    if (!test || !solutions) {
      return Q.reject({
        status : 404,
        message : 'არ მოიძებნა'
      });
    }

    res.render('admin/test', {
      pageTitle : 'ტესტი - ' + test.subject,
      test      : test,
      solutions : solutions,
      moment    : moment
    });
  })
  .catch(function (error) {
    res.status(error.status);
    res.render('admin/test', {
      message : error
    });
  });
});


module.exports = router;
