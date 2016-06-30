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
	staticRoutes.get('/user-management', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/my-dashboard', function(req,res){
		res.sendFile(index);
	});

	// Common View Components ===================
	staticRoutes.get('/app-shell', function(req,res){
		res.sendFile(base + '/public/app/shell/shell.html');
	});
	staticRoutes.get('/navbar', function(req,res){
		res.sendFile(base + '/public/app/navbar/navbar.html');
	});
	staticRoutes.get('/login', function(req,res){
		res.sendFile(base + '/public/app/login/login.html');
	});
	staticRoutes.get('/widget-container', function(req,res){
		res.sendFile(base + '/public/app/common/widget-container/widget-container.html');
	});
	staticRoutes.get('/widget-settings-dialog', function(req,res){
		res.sendFile(base + '/public/app/common/widget-settings-dialog/widget-settings-dialog.html');
	});
	staticRoutes.get('/weather-widget', function(req,res){
		res.sendFile(base + '/public/app/widgets/weather/weather.html');
	});
	staticRoutes.get('/weather-widget-settings', function(req,res){
		res.sendFile(base + '/public/app/widgets/weather/settings/weather-settings.html');
	});
	staticRoutes.get('/stocks-widget', function(req,res){
		res.sendFile(base + '/public/app/widgets/stocks/stocks.html');
	});
	staticRoutes.get('/stock', function(req,res){
		res.sendFile(base + '/public/app/widgets/stocks/stock/stock.html');
	});
	staticRoutes.get('/stocks-widget-settings', function(req,res){
		res.sendFile(base + '/public/app/widgets/stocks/settings/stocks-settings.html');
	});
	staticRoutes.get('/calendar-widget', function(req,res){
		res.sendFile(base + '/public/app/widgets/calendar/calendar.html');
	});
	staticRoutes.get('/calendar-widget-settings', function(req,res){
		res.sendFile(base + '/public/app/widgets/calendar/settings/calendar-settings.html');
	});
	staticRoutes.get('/quick-list-widget', function(req,res){
		res.sendFile(base + '/public/app/widgets/quick-list/quick-list.html');
	});
	staticRoutes.get('/quick-list-widget-settings', function(req,res){
		res.sendFile(base + '/public/app/widgets/quick-list/settings/quick-list-settings.html');
	});

	// Other static files
	staticRoutes.get('/zipcodes', function(req,res){
		res.sendFile(base + '/public/resources/zipcode.csv');
	});

	app.use('/',staticRoutes);
};