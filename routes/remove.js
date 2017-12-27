var mongoose = require('mongoose');
var User = require('..//model/userModel');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log('remove.......' + req.body._id)

    // find the user with id 4
    User.findOneAndRemove({ _id: req.body._id }, function(err, userFinded) {
        if (err) throw err;
    
        // we have deleted the user
        console.log('User deleted!' + userFinded);
    });

});

module.exports = router;