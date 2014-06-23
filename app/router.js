'use strict';

var app = rapp('lib/express').app,
  router = rapp('routes');

app.use(rapp('routes'));

module.exports = app;
