'use strict';

//keep globals to minimum
global.APP_ROOT = __dirname;
global.rapp     = require(APP_ROOT + '/helpers/require.js')(APP_ROOT, true);

var nconf = require('nconf').argv().env(),
    env   = nconf.get('NODE_ENV'),
    dbg   = require('debug')('app'),
    envs  = {
      'production'  : 'config',
      'development' : 'local'
    }, configFile;

global.ENV = env && envs[env] ? env : 'production';

configFile = ROOT + '/configs/' + envs[env] + '.json';

nconf.file(configFile);
