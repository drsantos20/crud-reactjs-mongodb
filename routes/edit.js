var mongoose = require('mongoose');
var User = require('..//model/userModel');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log('request body ' + req.body.name)
    console.log('request body ' + req.body.category)
    console.log('request body ' + req.body.value)

    // get a user with ID of 1
    User.findById(req.body._id, function(err, user) {
    if (err) throw err;
    
    user.name = req.body.name,
    user.category = req.body.category,
    user.value = req.body.value,
 
    // save the user
    user.save(function(err) {
      if (err) throw err;
      console.log('User successfully updated!');
    });
  });
});

module.exports = router;