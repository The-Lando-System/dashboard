(function() { 'use strict';

angular.module('dashboard')
.directive('appShell', AppShell);

function AppShell() {
  return {
    templateUrl: '/app-shell',
    controller: 'ShellController',
    controllerAs: 'shellVm',
    restrict: 'E',
    transclude: true
  };
};

})();