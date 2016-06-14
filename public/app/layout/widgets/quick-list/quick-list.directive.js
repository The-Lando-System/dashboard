(function() { 'use strict';

angular.module('dashboard')
.directive('quickListWidget', QuickListWidget);

function QuickListWidget() {
  return {
    templateUrl: '/quick-list-widget',
    restrict: 'E',
    controller: 'QuickListWidgetController',
    controllerAs: 'qlVm'
  };
};

})();