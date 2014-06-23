'use strict';

var express = rapp('express'),
  cookieParser = rapp('cookie-parser'),
  expressSession = rapp('express-session'),
  bodyParser = rapp('body-parser'),
  path = rapp('path'),
  expressValidator = rapp('express-validator'),
  app  = express();

app.set('view engine', 'jade');
app.set('views', path.join(APP_ROOT, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(ROOT + '/public'));

module.exports = { app : app, express : express };
