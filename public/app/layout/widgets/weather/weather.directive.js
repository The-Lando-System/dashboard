(function() { 'use strict';

angular.module('dashboard')
.directive('weatherWidget', WeatherWidget);

function WeatherWidget() {
  return {
    templateUrl: '/weather-widget',
    restrict: 'E',
    controller: 'WeatherWidgetController',
    controllerAs: 'weatherVm'
  };
};

})();