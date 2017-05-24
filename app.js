'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

db.serialize(function(){
  db.run("Drop Table IF EXISTS Person");
  db.run("CREATE TABLE Person (ID INTEGER PRIMARY KEY AUTOINCREMENT, email, username, password)");
  db.run("INSERT INTO Person (email, username, password) Values(?, ?, ?)", ['hello', 'h123', '0000']);
  db.each("SELECT* FROM Person", function(err, row){
      console.log(row);
  });
});
db.close();

var index = require('./routes/index');
var FAQ = require('./routes/FAQ');
var About = require('./routes/About');
var Donate = require('./routes/Donate');
var register = require('./routes/register');
var getdata = require('./routes/getdata');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/FAQ', FAQ);
app.use('/About', About);
app.use('/Donate', Donate);
app.use('/register', register);
app.use('/getdata', getdata);


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
