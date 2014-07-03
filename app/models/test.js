'use strict';

var
  validator = rapp('lib/validator'),
  mongoose = rapp('lib/mongoose'),
  nconf = require('nconf'),
  debug = require('debug')('app:models:test'),
  Q = require('q'),

TestSchema = new mongoose.Schema({
  owner : {
    unique   : true,
    type     : String,
    required : true,
    validate : [validator.isEmail, 'e-mail არასწორია']
  },
  subject : {
    type : String,
    required : true
  },
  questions : {
    type : Array,
    required : true,
  },
  createdAt : {
    type     : Date,
    required : true
  },
  deletedAt : {
    type     : Date,
    required : true
  }
});

exports = module.exports = mongoose.model('Test', TestSchema);
