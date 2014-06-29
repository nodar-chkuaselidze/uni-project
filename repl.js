'use strict';

global.ROOT = __dirname;
require('./app/index');

var repl = require('repl'), replServer;

global.Models      = load('models');
global.Controllers = load('controllers');
global.Routes      = load('routes');
global.Libs        = load('lib');

replServer = repl.start({
    prompt : 'quiz-engine> ',
    useGlobal : true
});

function load(dir) {
  var loaded = {},
      jsRegExp = /^(.*)\.js$/i;

  require('fs')
    .readdirSync(APP_ROOT + '/' + dir)
    .filter(function (file) {
      return jsRegExp.test(file);
    })
    .map(function (file) {
      var match = file.match(jsRegExp);

      loaded[match[1].charAt(0).toUpperCase() + match[1].slice(1)] = rapp(dir + '/' + file);
    });

  return loaded;
}
