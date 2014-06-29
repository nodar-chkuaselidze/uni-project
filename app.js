'use strict';

global.ROOT = __dirname;
require('./app/index');

var app = rapp('router'),
    nconf = require('nconf');

app.listen(nconf.get('port'), function () {
  console.log('Application started at %d port', nconf.get('port'));
});

module.exports = app;
