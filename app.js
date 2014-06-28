'use strict';

global.rapp = require('./app/helpers/require.js')('app', true);

var nconf = require('nconf').argv().env(),
    env   = nconf.get('NODE_ENV'),
    dbg   = require('debug')('app');

//keep globals to minimum
global.ROOT     = __dirname;
global.APP_ROOT = __dirname + '/app';
global.ENV      = env ? env : 'production';

nconf.file(ROOT + '/configs/' + (env === 'production' ? 'config' : 'local') + '.json');

var index = rapp('index'),
    app   = rapp('router');


app.listen(nconf.get('port'), function () {
  console.log('Application started at %d port', nconf.get('port'));
});

module.exports = app;
