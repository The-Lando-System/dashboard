(function() { 'use strict';

angular.module('dashboard')
.controller('WeatherWidgetController', WeatherWidgetController);

WeatherWidgetController.$inject = ['$http','$scope','PreferenceService'];

function WeatherWidgetController($http,$scope,PreferenceService) {
	var weatherVm = this;

  // Initialization ==============================================

  weatherVm.getWeather = getWeather;
  weatherVm.changeZipcode = changeZipcode;

  weatherVm.loading = false;

  weatherVm.lat = '38.8545855';
  weatherVm.lon = '-104.7929357';
  weatherVm.zipcode = '80909';
  weatherVm.city = 'Colorado Springs';

  initialize();

  // Interface Function Implementations ==============================

  function initialize(){
    componentHandler.upgradeAllRegistered();
    getZipcodes();
  }

  function changeZipcode(newZipcode){
    weatherVm.loading = true;

    PreferenceService.setPrefs({
      name: 'weather',
      value: newZipcode
    });

    weatherVm.zipcode = newZipcode;
    weatherVm.newZipcode = '';
    for(var i=0; i<weatherVm.zipData.length; i++){
      if (weatherVm.zipData[i].zip === weatherVm.zipcode){
        weatherVm.lat = weatherVm.zipData[i].latitude;
        weatherVm.lon = weatherVm.zipData[i].longitude;
        weatherVm.city = weatherVm.zipData[i].city;
        break;
      }
    }
    getWeather();
    
  };

  // Helper Functions ==============================

  function getZipcodes(){

    $http.get('/zipcodes')
    .success(function(data){
      weatherVm.zipData = csvToJson(data);
      changeZipcode(getPreference());
    })
    .error(function(data){
      console.log(data);
    });

  };

  function getNoaaUrl(){
    return 'http://forecast.weather.gov/MapClick.php?lat=' 
      + weatherVm.lat + '&lon=' + weatherVm.lon + '&FcstType=json&callback=JSON_CALLBACK';
  };


	function getWeather() {

    weatherVm.loading = true;

		$http.jsonp(getNoaaUrl())
    .success(function(data) {
      weatherVm.currentWeather = data.currentobservation.Weather;
      weatherVm.temperature = data.currentobservation.Temp;
      weatherVm.currentTime = data.currentobservation.Date;
      weatherVm.icon = "http://forecast.weather.gov/newimages/medium/" + data.currentobservation.Weatherimage;
      weatherVm.loading = false;
		})
    .error(function(data){
      console.log(data);
    });

	};

  function getPreference(){
    var zipcode = PreferenceService.getPrefs('weather');
    if (zipcode){
      return zipcode;
    } else {
      return weatherVm.zipcode;
    }
  }

  function csvToJson(csv) {

    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      if (currentline){
        for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
        }
      }

      result.push(obj);

    }

    return result;
  };

  // Listen for broadcast events =================================

  $scope.$on('getPrefs', function(event, success) {
    changeZipcode(getPreference());
  });

  $scope.$on('refresh', function(event, success) {
    getWeather();
  });

  $scope.$on('logout', function(event, success) {
    weatherVm.lat = '38.8545855';
    weatherVm.lon = '-104.7929357';
    weatherVm.zipcode = '80909';
    weatherVm.city = 'Colorado Springs';
    getWeather();
  });


};

})();