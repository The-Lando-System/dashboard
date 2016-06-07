(function() { 'use strict';

angular.module('dashboard')
.controller('WeatherWidgetController', WeatherWidgetController);

WeatherWidgetController.$inject = ['$http'];

function WeatherWidgetController($http) {
	var weatherVm = this;

	weatherVm.getWeather = getWeather;

	var defaultNoaaUrl = 'http://forecast.weather.gov/MapClick.php?lat=38.8545855&lon=-104.7929357&FcstType=json&callback=JSON_CALLBACK';


	function getWeather() {

  		$http.jsonp(defaultNoaaUrl).success(function(data) {
        weatherVm.timePeriod = data.time.startPeriodName[0];
        weatherVm.forecast = data.data.weather[0];
        weatherVm.temperature = data.data.temperature[0];
        weatherVm.currentTime = data.creationDateLocal;
        weatherVm.icon = data.data.iconLink[0];
  		});

  	};


  	weatherVm.getWeather();
};

})();