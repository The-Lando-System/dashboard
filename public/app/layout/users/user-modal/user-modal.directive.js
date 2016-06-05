(function() { 'use strict';

angular.module('dashboard')
.directive('userModal', UserModal);

function UserModal() {
  return {
    restrict: 'E',
    templateUrl: '/user-modal'
  };
};

})();