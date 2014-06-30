'use strict';

var app = rapp('lib/express').app,
  router = rapp('routes');

app.use('/',      rapp('routes/index'));
app.use('/admin', rapp('routes/admin'));

module.exports = app;
