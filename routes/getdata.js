/**
 * Created by FelixWu on 24/5/2017.
 */
'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

/* GET data page. */

exports.index = function(req, res){
    //var resultArray = [];
    db.serialize(function(){
        db.all("SELECT * FROM Person", function(err, row){
            res.render('getdata', {title: 'getdata', items: row});
        });
    });
    /*db.all("SELECT * FROM Person", function(err, rows){
        console.log(rows);
        res.render('getdata', {title: 'getdata', items: rows});
    });*/
};