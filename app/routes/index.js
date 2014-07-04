'use strict';

var express = rapp('lib/express').express,
  userController = rapp('controllers/user'),
  router = express.Router();

router.get('/', function (req, res) {
  res.render('index', {
    pageTitle : 'Nothing interesting'
  });
});

router.get('/test/:test_id/', function (req, res) {
  userController.getTestById(req)
  .then(function (test) {
    console.log(test);
    res.render('test', {
      test : test
    });
  })
  .catch(function (error) {
    res.status(error.status);
    res.render('test', {
      message : error
    });
  });
});

module.exports = router;
