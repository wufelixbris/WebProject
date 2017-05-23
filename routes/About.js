/**
 * Created by FelixWu on 23/5/2017.
 */
var express = require('express');
var router = express.Router();

/* GET About page. */
router.get('/', function(req, res, next) {
    res.render('About', {title: 'About'});
});

module.exports = router;