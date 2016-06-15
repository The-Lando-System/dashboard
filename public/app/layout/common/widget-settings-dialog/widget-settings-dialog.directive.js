(function() { 'use strict';

angular.module('dashboard')
.directive('widgetSettingsDialog', WidgetSettingsDialog);

function WidgetSettingsDialog() {
  return {
    templateUrl: '/widget-settings-dialog',
    restrict: 'E',
    scope: {
      header: '@'
    },
    transclude: true
  };
};

})();