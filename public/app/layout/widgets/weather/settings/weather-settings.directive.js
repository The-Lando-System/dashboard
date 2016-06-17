(function() { 'use strict';

angular.module('dashboard')
.directive('weatherWidgetSettings', WeatherWidgetSettings);

function WeatherWidgetSettings() {
  return {
    templateUrl: '/weather-widget-settings',
    controller: 'WidgetContainerController',
    controllerAs: 'widgetContainerVm',
    restrict: 'E'
  };
};

})();