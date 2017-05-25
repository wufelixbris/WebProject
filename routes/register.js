/**
 * Created by FelixWu on 24/5/2017.
 */
'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');
exports.index = function(req, res){
    res.render('register', {title: 'register'});
};
exports.registerUser = function(req, res){
    console.log(req.body);
    var resultArray = [];
    db.serialize(function(){
        db.run("INSERT INTO Person (email, username, password) VALUES (?, ?, ?)", [req.body.email, req.body.username, req.body.password]);
        db.each("SELECT * FROM Person", function(err, row){
            console.log(row);
        });
    });
    res.get(index);
    //console.log(resultArray);
    //res.redirect('/register');
};