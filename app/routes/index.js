'use strict';

var express = rapp('lib/express').express,
  router = express.Router();


router.get('/', function (req, res) {
  console.log('Got index page');
  res.render('index');
});

module.exports = router;
