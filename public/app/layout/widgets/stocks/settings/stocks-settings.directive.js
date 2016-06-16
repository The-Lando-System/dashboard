(function() { 'use strict';

angular.module('dashboard')
.directive('stocksWidgetSettings', StocksWidgetSettings);

function StocksWidgetSettings() {
  return {
    templateUrl: '/stocks-widget-settings',
    restrict: 'E',
    controller: 'WidgetSettingsController',
    controllerAs: 'widgetSettingsVm'
  };
};

})();