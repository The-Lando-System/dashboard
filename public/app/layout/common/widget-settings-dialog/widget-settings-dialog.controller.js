(function() { 'use strict';

angular.module('dashboard')
.controller('WidgetSettingsController', WidgetSettingsController);

WidgetSettingsController.$inject = [];

function WidgetSettingsController() {
  var widgetSettingsVm = this;

  widgetSettingsVm.showSettingsDialog = showSettingsDialog;
  widgetSettingsVm.hideSettingsDialog = hideSettingsDialog;

  var settingsDialog;

  function showSettingsDialog(id){
    settingsDialog = document.querySelector('#settings-dialog-' + id);
    settingsDialog.showModal();
  };

  function hideSettingsDialog(id){
    settingsDialog = document.querySelector('#settings-dialog-' + id);
    settingsDialog.close();
  };

  angular.element(document).ready(function () {
    componentHandler.upgradeAllRegistered();
  });
};

})();