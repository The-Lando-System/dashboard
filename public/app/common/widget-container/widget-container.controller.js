(function() { 'use strict';

angular.module('dashboard')
.controller('WidgetContainerController', WidgetContainerController);

WidgetContainerController.$inject = ['AuthService','$scope'];

function WidgetContainerController(AuthService,$scope) {
  var widgetContainerVm = this;

  widgetContainerVm.showSettingsDialog = showSettingsDialog;
  widgetContainerVm.hideSettingsDialog = hideSettingsDialog;
  widgetContainerVm.userSession = AuthService.startUserSession();

  $scope.$on('login', function(event, success) {
    widgetContainerVm.userSession = AuthService.startUserSession();
  });

  $scope.$on('logout', function(event, success) {
    widgetContainerVm.userSession = AuthService.startUserSession();
  });

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