(function() { 'use strict';

angular.module('dashboard')
.controller('WeatherWidgetController', WeatherWidgetController);

WeatherWidgetController.$inject = ['$http'];

function WeatherWidgetController($http) {
	var weatherVm = this;

	weatherVm.getWeather = getWeather;
  weatherVm.changeZipcode = changeZipcode;
  weatherVm.showSettingsDialog = showSettingsDialog;
  weatherVm.hideSettingsDialog = hideSettingsDialog;

  weatherVm.loading = false;

  weatherVm.lat = '38.8545855';
  weatherVm.lon = '-104.7929357';
  weatherVm.zipcode = '80909';
  weatherVm.city = 'Colorado Springs';

  getWeather();
  getZipcodes();

  function getZipcodes(){

    $http.get('/zipcodes')
    .success(function(data){
      weatherVm.zipData = csvToJson(data);
    })
    .error(function(data){
      console.log(data);
    });

  };

  function changeZipcode(){

    weatherVm.loading = true;

    for(var i=0; i<weatherVm.zipData.length; i++){
      if (weatherVm.zipData[i].zip === weatherVm.zipcode){
        weatherVm.lat = weatherVm.zipData[i].latitude;
        weatherVm.lon = weatherVm.zipData[i].longitude;
        weatherVm.city = weatherVm.zipData[i].city;
        break;
      }
    }
    getWeather();
    hideSettingsDialog();
  };

  function getNoaaUrl(){
    return 'http://forecast.weather.gov/MapClick.php?lat=' 
      + weatherVm.lat + '&lon=' + weatherVm.lon + '&FcstType=json&callback=JSON_CALLBACK';
  };


	function getWeather() {

    weatherVm.loading = true;

		$http.jsonp(getNoaaUrl())
    .success(function(data) {
      weatherVm.timePeriod = data.time.startPeriodName[0];
      weatherVm.forecast = data.data.weather[0];
      weatherVm.temperature = data.data.temperature[0];
      weatherVm.currentTime = data.creationDateLocal;
      weatherVm.icon = data.data.iconLink[0];
      weatherVm.loading = false;
		})
    .error(function(data){
      console.log(data);
    });

	};


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


  var settingsDialog;

  function showSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog-weather');
    }
    settingsDialog.showModal();
  };

  function hideSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog-weather');
    }
    settingsDialog.close();
  };

  angular.element(document).ready(function () {
    componentHandler.upgradeAllRegistered();
  });
};

})();