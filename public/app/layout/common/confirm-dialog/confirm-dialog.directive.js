(function() { 'use strict';

angular.module('dashboard')
.directive('confirmDialog', ConfirmDialog);

function ConfirmDialog() {
  return {
    templateUrl: '/confirm-dialog',
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