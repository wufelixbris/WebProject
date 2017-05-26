'use strict';
var Promise = require('bluebird');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('testDB.db');
var validator = require('validator');
var has = require('has');

exports.index = function(req, res){
    res.render('register', {title: 'register'});
};

exports.registerUser = function(req, res) {
    validateRegistration(req.body)
        .then((data) => insertNewUser(data))
        .then(() => {console.log(data); return null;})
        .then(() => {res.redirect('/register')})
        .catch((errors) => {flagValidationError(errors); res.redirect('/register');});
}

function flagValidationError(errors) {
    Object.keys(errors).forEach(key => console.log(`${key} error: `, errors[key]))
}

function insertNewUser(data) {
    return new Promise((resolve, reject) => {
        db.serialize( () => {
            db.run("INSERT INTO Person (email, username, password) VALUES (?, ?, ?)",
                [data.email, data.username, data.password],
                (err) => {
                    if (err)
                    reject(err);
                    return;
                })
        // dev check to see if successful --> db.all("SELECT * FROM Person", (err,rows) => console.log(rows));
        })
        resolve(data);
    });
}

function validateRegistration(data) {
    return Promise.try(() => {
        const errors = Object.keys(data).reduce((agg, field) => {
            if (validator.isEmpty(data[field])) {
                return agg.concat({[field]: "field can not be empty"});
            }
            return agg;
        }, [])
        if (!validator.isEmail(data.email)) {
            errors.push({"email": "Invalid email"});
        }
        if (!validator.isAlphanumeric(data.password)) {
            errors.push({"password": "Password must be alphanumeric"});
        }
        if (!validator.isLength(data.password, 8)) {
            errors.push({"password": "Password must be at least 8 characters"});
        }
        if (!validator.equals(data.password, data.confirmPassword)) {
            errors.push({"confirmPassword": "Passwords must match"});
        }
        if (errors.length === 0) return Promise.resolve(data);
        return Promise.reject(errors);
    })
}

