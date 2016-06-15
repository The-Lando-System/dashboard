(function() { 'use strict';

angular.module('dashboard')
.directive('weatherWidgetSettings', WeatherWidgetSettings);

function WeatherWidgetSettings() {
  return {
    templateUrl: '/weather-widget-settings',
    restrict: 'E',
    controller: 'WidgetSettingsController',
    controllerAs: 'widgetSettingsVm'
  };
};

})();