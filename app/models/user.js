'use strict';

var
validator = rapp('lib/validator'),
mongoose = rapp('lib/mongoose'),

UserSchema = new mongoose.Schema({
  email : {
    unique   : true,
    type     : String,
    required : true,
    validate : [validator.isEmail, 'e-mail არასწორია']
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
  roles : {
    type     : Array,
    required : true,
    select   : false,
    default  : [ 'authenticated' ]
  },
  hashedPassword : {
    type     : String,
    required : true,
    select   : false
  },
  salt : {
    type     : String,
    required : true,
    select   : false
  }
});

UserSchema.virtual('fullname').get(function () {
  return this.firstName + ' ' + this.lastName;
});

UserSchema.virtual('password').set(function (password) {
  this.hashedPassword = this.hashPassword(password);
});

UserSchema.statics.hashPassword = function (password) {
};

exports = module.exports = mongoose.model('User', UserSchema);
