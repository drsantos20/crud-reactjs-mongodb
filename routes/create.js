var mongoose = require('mongoose');
var User = require('..//model/userModel');
var express = require('express');
var router = express.Router();


router.post('/', function(req, res, next) {
    console.log(req.body.value)

    // create a new user
    var newUser = User({
        name: req.body.name,
        category: req.body.category,
        value: req.body.value
    });

    // save the user
    newUser.save(function(err) {
    
        if (err) throw err;
        console.log('User created!');
    });
});

module.exports = router;