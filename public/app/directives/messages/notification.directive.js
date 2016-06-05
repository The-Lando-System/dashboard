(function() { 'use strict';

angular.module('dashboard')
.directive('notification', Notification);

function Notification() {
  return {
    templateUrl: '/notification',
    restrict: 'E'
  };
};

})();