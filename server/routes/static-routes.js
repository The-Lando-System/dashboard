var jwt = require('jsonwebtoken');
var express = require('express');
var path = require('path');

var base = path.resolve(__dirname + '/../..');
var staticRoutes = express.Router();

module.exports = function(app) {

	// Application Routes ======================
	var index = base + '/public/index.html';

	staticRoutes.get('/', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/welcome', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/user-management', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/my-dashboard', function(req,res){
		res.sendFile(index);
	});

	// Common View Components ===================
	staticRoutes.get('/navbar', function(req,res){
		res.sendFile(base + '/public/app/layout/navbar/navbar.html');
	});
	staticRoutes.get('/jumbotron', function(req,res){
		res.sendFile(base + '/public/app/directives/jumbotron/jumbotron.html');
	});
	staticRoutes.get('/user-modal', function(req,res){
		res.sendFile(base + '/public/app/layout/users/user-modal/user-modal.html');
	});
	staticRoutes.get('/confirm-dialog', function(req,res){
		res.sendFile(base + '/public/app/directives/confirm-dialog/confirm-dialog.html');
	});
	staticRoutes.get('/notification', function(req,res){
		res.sendFile(base + '/public/app/directives/messages/notification.html');
	});
	staticRoutes.get('/login', function(req,res){
		res.sendFile(base + '/public/app/layout/login/login.html');
	});
	staticRoutes.get('/widget-container', function(req,res){
		res.sendFile(base + '/public/app/layout/common/widget-container/widget-container.html');
	});
	staticRoutes.get('/widget-settings-dialog', function(req,res){
		res.sendFile(base + '/public/app/layout/common/widget-settings-dialog/widget-settings-dialog.html');
	});
	staticRoutes.get('/weather-widget', function(req,res){
		res.sendFile(base + '/public/app/layout/widgets/weather/weather.html');
	});
	staticRoutes.get('/weather-widget-settings', function(req,res){
		res.sendFile(base + '/public/app/layout/widgets/weather/settings/weather-settings.html');
	});
	staticRoutes.get('/stocks-widget', function(req,res){
		res.sendFile(base + '/public/app/layout/widgets/stocks/stocks.html');
	});
	staticRoutes.get('/stocks-widget-settings', function(req,res){
		res.sendFile(base + '/public/app/layout/widgets/stocks/settings/stocks-settings.html');
	});
	staticRoutes.get('/calendar-widget', function(req,res){
		res.sendFile(base + '/public/app/layout/widgets/calendar/calendar.html');
	});
	staticRoutes.get('/calendar-widget-settings', function(req,res){
		res.sendFile(base + '/public/app/layout/widgets/calendar/settings/calendar-settings.html');
	});
	staticRoutes.get('/quick-list-widget', function(req,res){
		res.sendFile(base + '/public/app/layout/widgets/quick-list/quick-list.html');
	});
	staticRoutes.get('/quick-list-widget-settings', function(req,res){
		res.sendFile(base + '/public/app/layout/widgets/quick-list/settings/quick-list-settings.html');
	});

	// Other static files
	staticRoutes.get('/zipcodes', function(req,res){
		res.sendFile(base + '/public/resources/zipcode.csv');
	});

	app.use('/',staticRoutes);
};