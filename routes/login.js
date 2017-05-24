/**
 * Created by FelixWu on 24/5/2017.
 */
'use strict';
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

/* GET registration page. */
router.get('/', function(req, res, next) {
    res.render('login', {title: 'login'});
});

router.post('/submit', function(req, res){

    db.serialize(function(){
        var username = req.body.username;
        db.run("SELECT * FROM Person", function(err, row){
            console.log(row);
            if(req.body.password===row.password){
                console.log("success!");
            }else{
                console.log("fail...");
            }
        });
    });

    res.redirect('/');
});

module.exports = router;