/**
 * Created by FelixWu on 25/5/2017.
 */
'use strict';
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

router.get('/', function(req, res, next) {
    res.render('addListing', {title: 'Listing'});
});

router.post('/insert', function(req, res){
    db.serialize(function(){
        db.run('INSERT INTO Item (name, price, description, category) VALUES(?, ?, ?, ?)', [req.body.name, req.body.price, req.body.description, req.body.category]);
        db.each('SELECT * FROM Item', function(err, row){
            console.log(row);
        });
    });

    console.log('hello', req.body);
    res.redirect('/addListing');
});

module.exports = router;