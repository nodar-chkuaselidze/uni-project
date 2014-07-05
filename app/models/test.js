'use strict';

var
  validator = rapp('lib/validator'),
  mongoose = rapp('lib/mongoose'),
  nconf = require('nconf'),
  debug = require('debug')('app:models:test'),
  Q = require('q'),

TestSchema = new mongoose.Schema({
  owner : {
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
  maxScore : {
    type     : Number,
    required : true
  },
  createdAt : {
    type     : Date,
    required : true
  },
  deletedAt : {
    type     : Date,
    required : false
  }
});

exports = module.exports = mongoose.model('Test', TestSchema);
