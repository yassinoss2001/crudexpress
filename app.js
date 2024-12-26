var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var paysRouter = require('./routes/pays');
const mongo = require('mongoose');
const maConnection = require('./config/DataBase.json');

// Initialize Express app
var app = express();

// Connect to MongoDB
mongo.connect(maConnection.url)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

// CORS configuration for Vite React
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from Vite React

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pays', paysRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
