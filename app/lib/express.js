'use strict';

var express = require('express'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  bodyParser = require('body-parser'),
  flash = require('express-flash'),
  path = require('path'),
  expressValidator = require('express-validator'),
  passport = rapp('lib/passport'),
  nconf = require('nconf'),
  app  = express();

app.set('view engine', 'jade');
app.set('views', path.join(APP_ROOT, 'views'));

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(flash());
app.use(expressSession({ secret : 'Some dummy text, still has to be in configs'}));
app.use(express.static(ROOT + '/public'));
app.use(passport.initialize());
app.use(passport.session());

if (nconf.get('NODE_ENV') === 'development') {
  app.locals.pretty = true;

  if (nconf.get('dev-autoAuth')) {
    //automatically authenticate admin
    app.use(function (req, res, next) {
      if (req.user) {
        next();
        return;
      }

      var User = rapp('models/user');

      User.findOneQ({ 
        'email' : nconf.get('admin').email
      }).then(function (user) {
        req.logIn(user, function (err) {
          if (err) throw err;
          next();
        });
      }).fail(function (error) {
        throw new Error(error);
      });
    });
  }
}

app.use(function (req, res, next) {
  res.setHeader('X-Powered-By', 'TSU');

  if (req.user) {
    res.locals.user = req.user;
  }

  next();
});

module.exports = { app : app, express : express };
