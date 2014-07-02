'use strict';

var express = rapp('lib/express').express,
  router = express.Router();

router.get('/', function (req, res) {
  res.render('index', {
    pageTitle : 'Nothing interesting'
  });
});

module.exports = router;
