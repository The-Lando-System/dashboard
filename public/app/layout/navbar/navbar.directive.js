(function() { 'use strict';

angular.module('dashboard')
.directive('navbar', Navbar);

function Navbar() {
  return {
    restrict: 'E',
    templateUrl: '/navbar',
    controller: 'NavbarController',
    controllerAs: 'vm'
  };
};

})();