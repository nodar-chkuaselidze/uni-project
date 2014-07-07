'use strict';

var path = require('path');

global.ROOT = path.resolve(__dirname + '/../');
require('../app/index');

var User = rapp('models/user'),
  Test = rapp('models/test'),
  Solution = rapp('models/solution'),
  mongoose = rapp('lib/mongoose'),
  nconf = require('nconf');

mongoose.connection.once('open', function () {
  User.removeQ({})
  .then(function () {
    return Test.removeQ({});
  })
  .then(function () {
    return Solution.removeQ({});
  })
  .then(function () {
    var defaultUser = nconf.get('admin'),
      user = new User();

    for(var field in defaultUser) {
      user[field] = defaultUser[field];
    }

    user.roles = [ 'authenticated', 'lecturer', 'admin' ];

    return user.setPassword(user['password']).then(function () {
      delete user.password;
      return user.saveQ();
    });
  })
  .then(function (user) {
    console.log('მომხმარებელი წარმატებით დაემატა');
    console.log(user);
    mongoose.connection.close();
  })
  .catch(function (error) {
    console.error(error);
    mongoose.connection.close();
  });
});

mongoose.connection.on('error', function (error) {
  console.error(error);
});
