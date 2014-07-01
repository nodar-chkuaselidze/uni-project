'use strict';

var app = rapp('lib/express').app,
  router = rapp('routes');

app.use('/',         rapp('routes/index'));
app.use('/lecturer', rapp('routes/lecturer'));

module.exports = app;
