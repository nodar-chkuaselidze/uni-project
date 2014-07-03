'use strict';

var
  validator = rapp('lib/validator'),
  mongoose = rapp('lib/mongoose'),
  nconf = require('nconf'),
  debug = require('debug')('app:models:test'),
  Q = require('q'),

SolutionSchema = new mongoose.Schema({
  ID : {
    unique   : true,
    type     : String,
    required : true
  },
  firstName : {
    type     : String,
    required : true,
    validate : [validator.geoAlpha, 'გამოიყენეთ მხოლოდ ქართული სიმბოლოები']
  },
  lastName : {
    type     : String,
    required : true,
    validate : [validator.geoAlpha, 'გამოიყენეთ მხოლოდ ქართული სიმბოლოები']
  },
  answers : {
    type     : Array,
    required : true
  },
  score : {
    type     : Number,
    required : true,
    default  : 0
  },
  createdAt : {
    type     : Date,
    required : true
  }
});

exports = module.exports = mongoose.model('Solution', SolutionSchema);
