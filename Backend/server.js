var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
const { v4: uuidv4 } = require('uuid');
const sessions = require('express-session');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const services = require('./services');

const PORT = 8888;
const CONNECTION_URL = "mongodb+srv://COSC4351:123@cluster0.gemzljx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL, { dbName: "reservation-system", useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    app.listen(PORT, () => { console.log("Listening on port: " + PORT); });
    await services.tablesSeed();
  })
  .catch((error) => { console.log(error) });

var app = express();
app.use(cors({ credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('trust proxy', 1);

app.use(sessions({
  secret: uuidv4(),
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: false
  }
}));

const accountRouter = require('./routes/account')
app.use('/account', accountRouter);

const profileRouter = require('./routes/profile')
app.use('/profile', profileRouter);

const reservationRouter = require('./routes/reservation')
app.use('/reservation', reservationRouter);



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
