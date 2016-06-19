(function() { 'use strict';

angular.module('dashboard')
.directive('calendarWidget', CalendarWidget);

function CalendarWidget() {
  return {
    templateUrl: '/calendar-widget',
    restrict: 'E',
    controller: 'CalendarWidgetController',
    controllerAs: 'calendarVm'
  };
};

})();