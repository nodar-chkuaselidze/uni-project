'use strict';

require('./configs/bootstrap.js')(__dirname);

var repl = require('repl'), replServer;

replServer = repl.start({
    prompt : 'quiz-engine> ',
    useGlobal : true
});
