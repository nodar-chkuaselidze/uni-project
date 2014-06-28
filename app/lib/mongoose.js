'use strict';

var nconf = require('nconf'),
  debug = require('debug')('lib:db'),
  mongoose = require('mongoose-q')(require('mongoose')),
  db = mongoose.connect(nconf.get('db')),
  conn = db.connection;

conn.once('open', function () {
  debug('Conntected to mongodb: ' + nconf.get('db'));
});

conn.on('error', function (e) {
  debug('Error: ' + e);
});

exports = module.exports = db;
