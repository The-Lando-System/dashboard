(function() { 'use strict';

angular.module('dashboard')
.controller('WeatherWidgetSettingsController', WeatherWidgetSettingsController);

WeatherWidgetSettingsController.$inject = ['$http'];

function WeatherWidgetSettingsController($http) {
  var weatherSettingsVm = this;

  weatherSettingsVm.showSettingsDialog = showSettingsDialog;
  weatherSettingsVm.hideSettingsDialog = hideSettingsDialog;

  var settingsDialog;

  function showSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog');
    }
    settingsDialog.showModal();
  };

  function hideSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog');
    }
    settingsDialog.close();
  };

  angular.element(document).ready(function () {
    componentHandler.upgradeAllRegistered();
  });
};

})();