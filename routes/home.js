'use strict';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');
exports.index = function(req, res) {
  db.serialize(function(){
    db.all('SELECT * FROM Item', function(err, row){
      res.render('home', {title: 'Brizzar', items: row,
          lParam1:'A',
          lParam2:'B',
          lParam3: 'C',
          lParam4: 'D'});
    });
  });
  //res.render('home', { title: 'Brizzar' });
};
