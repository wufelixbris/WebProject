/**
 * Created by FelixWu on 24/5/2017.
 */
'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');
exports.index = function(req, res){
    res.render('register', {title: 'register'});
};
exports.insert = function(req, res){
    console.log(req.body);
    res.get(index);
    /*redirect('/register');*/
};
