(function() { 'use strict';

angular.module('dashboard')
.directive('calendarWidgetSettings', CalendarWidgetSettings);

function CalendarWidgetSettings() {
  return {
    templateUrl: '/calendar-widget-settings',
    controller: 'WidgetContainerController',
    controllerAs: 'widgetContainerVm',
    restrict: 'E'
  };
};

})();