(function() { 'use strict';

angular.module('dashboard')
.directive('confirmDialog', ConfirmDialog);

function ConfirmDialog() {
  return {
    templateUrl: '/confirm-dialog',
    restrict: 'E'
  };
};

})();