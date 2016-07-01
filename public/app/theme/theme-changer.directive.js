(function() { 'use strict';

angular.module('dashboard')
.directive('themeDialog', themeDialogDirective);

function themeDialogDirective() {
  return {
    restrict: 'E',
    templateUrl: '/theme-dialog',
    controller: 'ThemeChangerController',
    controllerAs: 'themeVm'
  };
};

})();