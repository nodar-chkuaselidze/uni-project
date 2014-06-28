'use strict';

require('./configs/bootstrap.js')(__dirname);

var app = rapp('router'),
    nconf = require('nconf');


app.listen(nconf.get('port'), function () {
  console.log('Application started at %d port', nconf.get('port'));
});

module.exports = app;
