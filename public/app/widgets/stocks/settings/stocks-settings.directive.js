(function() { 'use strict';

angular.module('dashboard')
.directive('stocksWidgetSettings', StocksWidgetSettings);

function StocksWidgetSettings() {
  return {
    templateUrl: '/stocks-widget-settings',
    controller: 'WidgetContainerController',
    controllerAs: 'widgetContainerVm',
    restrict: 'E'
  };
};

})();