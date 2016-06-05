var jwt = require('jsonwebtoken');
var express = require('express');
var path = require('path'); 
var base = path.resolve(__dirname + '/../..');

var userRoutes = express.Router();

module.exports = function(app) {

	// Verify user token ===========================
	userRoutes.use(function(req,res,next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err,decoded){
				if (err) {
					return res.json({ success: false, message: err.name});
				} else {
					req.decoded = decoded._doc;
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided!'
			});
		}
	});

	// User routes ==================================
	

	app.use('/user',userRoutes);

};