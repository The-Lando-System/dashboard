(function() { 'use strict';

angular.module('dashboard')
.controller('WidgetContainerController', WidgetContainerController);

WidgetContainerController.$inject = [];

function WidgetContainerController() {
  var widgetContainerVm = this;

  widgetContainerVm.showSettingsDialog = showSettingsDialog;
  widgetContainerVm.hideSettingsDialog = hideSettingsDialog;

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