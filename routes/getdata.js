/**
 * Created by FelixWu on 24/5/2017.
 */
'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

/* GET registration page. */

exports.index = function(req, res){
    db.serialize(function(){
        db.each("SELECT * FROM Person", function(err, row){
            res.render('register', {
                title: 'register',
                email: row.email,
                username: row.username,
                password: row.password
            });
        });
    });
    db.close();
};

