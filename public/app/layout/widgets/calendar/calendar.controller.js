(function() { 'use strict';

angular.module('dashboard')
.controller('CalendarWidgetController', CalendarWidgetController);

CalendarWidgetController.$inject = ['$http'];

function CalendarWidgetController($http) {
  var calendarVm = this;

  calendarVm.loading = false;
  calendarVm.hideSettingsDialog = hideSettingsDialog;
  calendarVm.showSettingsDialog = showSettingsDialog;

  var settingsDialog;

  function showSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog-calendar');
    }
    settingsDialog.showModal();
  };

  function hideSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog-calendar');
    }
    settingsDialog.close();
  };

  angular.element(document).ready(function () {
  	componentHandler.upgradeAllRegistered();
  });

};

})();