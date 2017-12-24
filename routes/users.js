var mongoose = require('mongoose');
var User = require('..//model/userModel');
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

	User.find({}, function(err, users) {
		if (err) throw err;
	  
		// object of all the users
		console.log(users);
		res.send(JSON.stringify(users));
	  });
	  
});

module.exports = router;