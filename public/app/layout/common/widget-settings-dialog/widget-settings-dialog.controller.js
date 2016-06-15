(function() { 'use strict';

angular.module('dashboard')
.controller('WidgetSettingsController', WidgetSettingsController);

WidgetSettingsController.$inject = [];

function WidgetSettingsController() {
  var widgetSettingsVm = this;

  widgetSettingsVm.showSettingsDialog = showSettingsDialog;
  widgetSettingsVm.hideSettingsDialog = hideSettingsDialog;

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