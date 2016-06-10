(function() { 'use strict';

angular.module('dashboard')
.directive('stocksWidget', StocksWidget);

function StocksWidget() {
  return {
    templateUrl: '/stocks-widget',
    restrict: 'E',
    controller: 'StocksWidgetController',
    controllerAs: 'stocksVm'
  };
};

})();