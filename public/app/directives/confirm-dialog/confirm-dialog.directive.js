(function() { 'use strict';

angular.module('dashboard')
.directive('confirmDialog', ConfirmDialog);

function ConfirmDialog() {
  return {
    templateUrl: '/confirm-dialog',
    controller: 'ConfirmDialogController',
    controllerAs: 'confirmVm',
    scope: {
      confirmId: '@confirmId',
      confirmHeader: '@confirmHeader',
      confirmText: '@confirmText'
    },
    restrict: 'E',
    transclude: true
  };
};

})();