'use strict';

var express = require('express'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  bodyParser = require('body-parser'),
  flash = require('express-flash'),
  path = require('path'),
  expressValidator = require('express-validator'),
  passport = rapp('lib/passport'),
  app  = express();

app.set('view engine', 'jade');
app.set('views', path.join(APP_ROOT, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(flash());
app.use(expressSession({ secret : 'Some dummy text, still has to be in configs'}));
app.use(express.static(ROOT + '/public'));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }

  next();
});

if (require('nconf').get('NODE_ENV') === 'development') {
  app.locals.pretty = true;
}

module.exports = { app : app, express : express };
