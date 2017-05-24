/**
 * Created by FelixWu on 24/5/2017.
 */
'use strict';
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

/* GET registration page. */

router.get('/',function(req, res, next){
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
});

module.exports = router;