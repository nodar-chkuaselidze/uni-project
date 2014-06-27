'use strict';

var express = rapp('lib/express').express,
  router = express.Router(),
  middlewares = rapp('lib/middlewares');

router.get('/', function (req, res) {
  res.render('index', {
    pageTitle : 'Nothing interesting'
  });
});

module.exports = router;
