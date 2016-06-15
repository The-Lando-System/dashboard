(function() { 'use strict';

angular.module('dashboard')
.directive('widgetContainer', WidgetContainer);

function WidgetContainer() {
  return {
    templateUrl: '/widget-container',
    restrict: 'E',
    scope: {
      header: '@'
    },
    transclude: true
  };
};

})();