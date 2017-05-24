/**
 * Created by FelixWu on 24/5/2017.
 */
'use strict';
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

/* GET data page. */

router.get('/',function(req, res, next){
    var resultArray = [];
    db.serialize(function(){
        db.each("SELECT * FROM Person", function(err, row){
            resultArray.push(row);
        });
    });
    db.all("SELECT * FROM Person", function(err, rows){
        console.log(rows);
        res.render('getdata', {title: 'getdata', items: rows});
    });
});

module.exports = router;