(function() { 'use strict';

angular.module('dashboard')
.directive('quickListWidgetSettings', QuickListWidgetSettings);

function QuickListWidgetSettings() {
  return {
    templateUrl: '/quick-list-widget-settings',
    controller: 'WidgetContainerController',
    controllerAs: 'widgetContainerVm',
    restrict: 'E'
  };
};

})();