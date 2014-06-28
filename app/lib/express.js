'use strict';

var express = require('express'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  bodyParser = require('body-parser'),
  path = require('path'),
  expressValidator = require('express-validator'),
  app  = express();

app.set('view engine', 'jade');
app.set('views', path.join(APP_ROOT, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(ROOT + '/public'));

module.exports = { app : app, express : express };
