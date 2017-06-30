var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var setting = require('./modules/setting.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ect', ectRenderer.render);
app.set('view engine', 'ect');
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret',
    store: new mongoStore({
      url: setting.SESSION_URL,
      autoRemove: 'interval',
      autoRemoveInterval: 60 
    }),
    cookie: {
        httpOnly: true, 
        maxAge: 60 * 60 * 1000
    }
}));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
