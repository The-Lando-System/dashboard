(function() { 'use strict';

angular.module('dashboard')
.controller('WeatherWidgetController', WeatherWidgetController);

WeatherWidgetController.$inject = ['$http','$scope','PreferenceService'];

function WeatherWidgetController($http,$scope,PreferenceService) {
	var weatherVm = this;
  var TAG = 'WeatherWidgetController: ';

  // Initialization ==============================================

  weatherVm.getWeather = getWeather;
  weatherVm.changeZipcode = changeZipcode;

  weatherVm.loading = false;

  initialize();

  function initialize(){
    componentHandler.upgradeAllRegistered();
    setDefaultData();
    initializeZipcodes();
  }

  // Interface Function Implementations ==============================

  function changeZipcode(newZipcode){
    weatherVm.loading = true;

    PreferenceService.setPrefs({
      name: 'weather',
      value: newZipcode
    });

    weatherVm.zipcode = newZipcode;
    weatherVm.newZipcode = '';

    getWeather(weatherVm.zipcode);
    
  };

  // Helper Functions ==============================

  function initializeZipcodes(){

    $http.get('/zipcodes')
    .success(function(data){
      weatherVm.zipData = csvToJson(data);
      getWeather(getPreference());
    })
    .error(function(data){
      console.log(data);
    });

  };

  function getNoaaUrl(lat,lon){
    return 'http://forecast.weather.gov/MapClick.php?lat=' 
      + lat + '&lon=' + lon + '&FcstType=json&callback=JSON_CALLBACK';
  };


	function getWeather(zipcode) {

    weatherVm.loading = true;

    setCoordinatesFromZipcode(zipcode);

    var noaaUrl = getNoaaUrl(weatherVm.lat, weatherVm.lon);

		$http.jsonp(noaaUrl)
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

  function setCoordinatesFromZipcode(zipcode){

    if (!weatherVm.zipData){
      console.warn(TAG + 'Failed to set coordinates because zip data was not retrieved!');
      return;
    }

    for(var i=0; i<weatherVm.zipData.length; i++){
      if (weatherVm.zipData[i].zip === zipcode){
        weatherVm.lat = weatherVm.zipData[i].latitude;
        weatherVm.lon = weatherVm.zipData[i].longitude;
        weatherVm.city = weatherVm.zipData[i].city;
        return;
      }
    }
  }

  function setDefaultData(){
    weatherVm.lat = '38.8545855';
    weatherVm.lon = '-104.7929357';
    weatherVm.zipcode = '80909';
    weatherVm.city = 'Colorado Springs';
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
    getWeather(getPreference());
  });

  $scope.$on('refresh', function(event, success) {
    getWeather(getPreference());
  });

  $scope.$on('logout', function(event, success) {
    setDefaultData();
    getWeather(getPreference());
  });


};

})();