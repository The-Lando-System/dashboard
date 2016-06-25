(function() { 'use strict';

angular.module('dashboard')
.directive('stock', StockDirective);

function StockDirective() {
  return {
    templateUrl: '/stock',
    restrict: 'E',
    controller: 'StockController',
    controllerAs: 'stockVm',
    scope: {
    	'stockId': '='
    }
  };
};

})();