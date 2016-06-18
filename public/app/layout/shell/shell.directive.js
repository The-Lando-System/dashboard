(function() { 'use strict';

angular.module('dashboard')
.directive('appShell', AppShell);

function AppShell() {
  return {
    templateUrl: '/app-shell',
    restrict: 'E',
    transclude: true
  };
};

})();