'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

db.serialize(function(){
  db.run("DROP Table IF EXISTS Comment");
  db.run("DROP Table IF EXISTS Item");
  db.run("DROP Table IF EXISTS Person");
  db.run("CREATE TABLE Person (ID INTEGER PRIMARY KEY AUTOINCREMENT, email UNIQUE NOT NULL, username UNIQUE NOT NULL, password NOT NULL)");
  db.run("CREATE TABLE Item (ID INTEGER PRIMARY KEY AUTOINCREMENT, name NOT NULL, price NOT NULL, description, category)");
  //db.run("CREATE TABLE Item (ID INTEGER PRIMARY KEY AUTOINCREMENT, name NOT NULL, owner NOT NULL, price NOT NULL, description, dateTime DATETIME NOT NULL, FOREIGN KEY(owner) REFERENCES Person(ID))");
  db.run("CREATE TABLE Comment (ID INTEGER PRIMARY KEY AUTOINCREMENT, owner NOT NULL, item NOT NULL, content NOT NULL, FOREIGN KEY(owner) REFERENCES Person(ID), FOREIGN KEY(item) REFERENCES Item(ID))");
  db.run("INSERT INTO Person (email, username, password) Values(?, ?, ?)", ['hello', 'h123', '0000']);
  db.each("SELECT* FROM Person", function(err, row){
      console.log(row);
  });
});
db.close();

var home = require('./routes/home');
var FAQ = require('./routes/FAQ');
var About = require('./routes/About');
var Donate = require('./routes/Donate');
var register = require('./routes/register');
var register = require('./routes/register');
var getdata = require('./routes/getdata');
var login = require('./routes/login');
var addListing = require('./routes/addListing');

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

app.get('/', home.index);
app.get('/FAQ', FAQ.index);
app.get('/About', About.index);
app.get('/Donate', Donate.index);
app.get('/register', register.index);
app.post('/register/registerUser', register.registerUser);
app.get('/getdata', getdata.index);
app.use('/login', login);
app.use('/addListing', addListing);

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
