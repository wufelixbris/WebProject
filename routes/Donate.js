/**
 * Created by FelixWu on 23/5/2017.
 */
var express = require('express');
var router = express.Router();

/* GET Donation page. */
router.get('/', function(req, res, next) {
    res.render('Donate', {title: 'Donate'});
});

module.exports = router;