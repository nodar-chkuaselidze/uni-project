'use strict';

define([ 'express', 'nconf', 'cookie-parser', 'express-session', 'body-parser', 'path', 'express-validator'],
function (express,   nconf,   cookieParser,    expressSession,    bodyParser,    path, expressValidator) {
  var app  = express();


  app.set('port', nconf.get('port'));
  app.set('view engine', 'jade');
  app.set('views', path.join(APP_PATH, 'views'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(expressValidator());
  app.use(cookieParser());

  return app;
});
