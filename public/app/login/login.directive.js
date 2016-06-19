(function() { 'use strict';

angular.module('dashboard')
.directive('login', Login);

function Login() {
  return {
    restrict: 'E',
    templateUrl: '/login',
    controller: 'LoginController',
    controllerAs: 'loginVm'
  };
};

})();