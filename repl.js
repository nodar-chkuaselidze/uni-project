'use strict';

global.ROOT = __dirname;
require('./app/index');

var repl = require('repl'), replServer;

replServer = repl.start({
    prompt : 'quiz-engine> ',
    useGlobal : true
});
