'use strict';

//keep globals to minimum
global.APP_ROOT = __dirname;
global.rapp     = require(APP_ROOT + '/helpers/require.js')(APP_ROOT, true);

var nconf = require('nconf').argv().env(),
    env   = nconf.get('NODE_ENV'),
    dbg   = require('debug')('app');

global.ENV = env || 'production';

nconf.file(ROOT + '/configs/local.json');
