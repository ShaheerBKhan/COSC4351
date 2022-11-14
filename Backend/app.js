var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
const { v4: uuidv4 } = require('uuid');
const sessions = require('express-session');

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.set('trust proxy', 1);

app.use(sessions({
  secret: uuidv4(),
  saveUninitialized: true,
  resave: false,
  cookie: {
    Test: "TestValue"
  }
}));

var controllerRouter = require('./routes/controller');
app.use('/controller', controllerRouter);

var listener = app.listen(8888, () => {
  console.log("Listening on port: " + listener.address().port);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
