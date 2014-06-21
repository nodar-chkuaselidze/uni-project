'use strict';

var nconf = require('nconf').argv().env(),
    //lj    = require('longjohn'),
    env   = nconf.get('NODE_ENV');

//lj.async_trace_limit = -1;

//keep globals to minimum
global.ROOT     = __dirname;
global.APP_ROOT = __dirname + '/app';
global.ENV      = env ? env : 'production';

nconf.file(ROOT + '/config.json');

if (ENV === 'development') {
  nconf.file(ROOT + '/local.json');
}

global.rapp = require('./app/helpers/require.js')('app', true);

var index  = rapp('index'),
    router = rapp('router');


//requirejs(['index', 'router'], function (app) {
//  console.log('App loaded');
//});
