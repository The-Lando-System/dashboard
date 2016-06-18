var jwt = require('jsonwebtoken');
var express = require('express');
var path = require('path'); 
var base = path.resolve(__dirname + '/../..');
var List = require(base + '/server/models/list-item');

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
	
	// Quick List routes
	userRoutes.get('/list', function(req,res){
		var user = req.decoded;
		List.find({ username: user.username }, function(err,items){
			if (err) { 
				res.send(err);
				return;
			} else {
				res.json(items);
				return;
			}
		});
	});
	userRoutes.post('/list', function(req,res){
		var user = req.decoded;
		List.find({ username: user.username }, function(err,items){

			// For now, only limit the list to 10 items
			if (items.length >= 10){
				res.status(404).send({ success: false, message: "You may only have 10 items in your quick list!" });
				return;
			}

			var newPosition = 1;
			if (items.length > 0){
				for (var i=0; i<items.length; i++){
					if (items[i].position >= newPosition){
						newPosition = items[i].position + 1;
					}
				}
			}
			List.create({
				username:    user.username,
				description: req.body.description,
				position:    newPosition
			}, function(err,item){
				if (err) {
					res.send(err)
					return;
				} else {
					res.send(item);
					return;
				}
			});
		});
	});

	userRoutes.delete('/list/:id', function(req,res){
		List.remove({ _id: req.params.id }, function(err,item){
			if (err) {
				res.send(err);
				return;
			} else {
				res.send(item);
				return;
			}
		});
	});
	userRoutes.put('/list', function(req,res){
		List.findById(req.body._id, function(err,item){
			if (err) {
				res.send(err)
				return;
			};
			item.description 	= req.body.description 	|| item.description;
			item.complete 		= req.body.complete 	|| item.complete;
			item.position 		= req.body.position 	|| item.position;
			item.save(function(err){
				if (err) {
					res.send(err);
					return;
				} else {
					res.json({ message: 'Item was successfully updated!' });
					return;
				}
			});
		});
	});
	
	app.use('/user',userRoutes);

};