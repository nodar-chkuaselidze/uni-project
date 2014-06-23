'use strict';

var nconf = require('nconf').argv().env(),
    env   = nconf.get('NODE_ENV');

//keep globals to minimum
global.ROOT     = __dirname;
global.APP_ROOT = __dirname + '/app';
global.ENV      = env ? env : 'production';

nconf.file(ROOT + '/configs/' + (env === 'production' ? 'config' : 'local') + '.json');

global.rapp = require('./app/helpers/require.js')('app', true);

var index = rapp('index'),
    app   = rapp('router');


app.listen(nconf.get('port'), function () {
  console.log(arguments);
});
module.exports = app;
