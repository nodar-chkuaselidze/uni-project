'use strict';

var
  validator = rapp('lib/validator'),
  mongoose = rapp('lib/mongoose'),
  nconf = require('nconf'),
  debug = require('debug')('app:models:solution'),
  Q = require('q'),

SolutionSchema = new mongoose.Schema({
  testId : {
    type     : mongoose.Schema.Types.ObjectId,
    required : true
  },
  ID : {
    type     : String,
    validate : [
      { validator : validator.notEmpty, msg : 'ID შეყვანა აუცილებელია' },
      { validator : validator.isPersonId, msg : 'პერონსალური ID არასწორია' }
    ]
  },
  firstName : {
    type     : String,
    validate : [
      { validator : validator.notEmpty, msg : 'სახელის შეყვანა აუცილებელია' },
      { validator : validator.geoAlpha, msg : 'სახელში გამოიყენეთ მხოლოდ ქართული სიმბოლოები'}
    ]
  },
  lastName : {
    type     : String,
    validate : [
      { validator : validator.notEmpty, msg : 'გვარის შეყვანა აუცილებელია' },
      { validator : validator.geoAlpha, msg : 'გვარში გამოიყენეთ მხოლოდ ქართული სიმბოლოები'}
    ]
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
  },
  deletedAt : {
    type     : Date
  }
});

SolutionSchema.statics.checkAnswers = function (questions, answers) {
  var score = 0;
  questions.forEach(function (question, i) {
    answers[i] = answers[i] !== '' ? answers[i] : [];

    var correctAnswer = true;

    question.answers.forEach(function (answer, j) {
      answers[i][j] = {
        correct : answers[i][j] === 'on' ? true : false,
        text : answer.text
      };

      if (answers[i][j].correct !== answer.correct) {
        correctAnswer = false;
      }
    });

    if (correctAnswer) {
      score += question.rightAnswer;
    }
  });

  return { score : score, answers : answers };
};

exports = module.exports = mongoose.model('Solution', SolutionSchema);
