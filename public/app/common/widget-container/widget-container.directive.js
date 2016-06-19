(function() { 'use strict';

angular.module('dashboard')
.directive('widgetContainer', WidgetContainer);

function WidgetContainer() {
  return {
    templateUrl: '/widget-container',
    controller: 'WidgetContainerController',
    controllerAs: 'widgetContainerVm',
    restrict: 'E',
    scope: {
      header: '@',
      widgetId: '@widgetId'
    },
    transclude: true
  };
};

})();