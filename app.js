'use strict';

global.ROOT     = __dirname;
global.APP_ROOT = __dirname + '/app';

var requirejs = require('requirejs');

requirejs.config({
  baseUrl : 'app',
  nodeRequire : require
});

requirejs(['index'], function (app) {

});
