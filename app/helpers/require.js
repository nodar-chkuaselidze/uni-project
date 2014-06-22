'use strict';

var
  path = require('path'),
  util = require('util'),
  dbg  = require('debug')('require:info');

function Require(root, modifyStack) {
  this.setRoot(root);
  this.modifyStack = modifyStack;

  if (modifyStack) {
    Error.stackTraceLimit = Infinity;
  }
}

Require.prototype.require = function (modulePath) {
  var file = path.join(this.root, modulePath);
  dbg('trying to get file: ' +  file);

  try {
    return require(file);
  } catch(e) {
    if (e.code === 'MODULE_NOT_FOUND' && e.message.match(/^Cannot find module '(.*)'$/i)[1] === file) {
      dbg(file + ' not found, try to find module');
      return require(modulePath);
    }

    if (this.modifyStack) {
      throw changeStack(e);
    }

    throw e; //if its not require error throw error
  }
}

function changeStack(e) {
  var stackArr = e.stack.split('\n'),
    stack = [];

  stackArr.forEach(function (msg) {
    var inBrackets = msg.match(/^\s*at [^\(]*\((.*):\d+:\d+\)$/i),
      noBrackets = msg.match(/^\s*at ([^\(]*):\d+:\d+$/i),
      matchName = '',
      skips = [ 'node.js', 'module.js', __filename ];


    if (inBrackets && inBrackets[1]) {
      matchName = inBrackets[1];
    }
    else if (noBrackets && noBrackets[1]) {
      matchName = noBrackets[1];
    }

    if (matchName !== '' && skips.indexOf(matchName) > -1) {
    } else {
      stack.push(msg);
    }
  });

  stack = stack.join('\n');
  e.stack = stack;

  return e;
}

Require.prototype.setRoot = function (dir) {
  dbg('set root to: ' + dir);
  this.root = path.resolve(dir);
};

Require.prototype.getRoot = function (dir) {
  return this.root;
};

module.exports = function (root, modifyStack) {
  dbg('create new Require instance with root: ' + root);
  var r = new Require(root, modifyStack);

  return function (file) {
    return r.require(file);
  }
};
