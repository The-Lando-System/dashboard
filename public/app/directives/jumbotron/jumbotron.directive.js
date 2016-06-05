(function() { 'use strict';

angular.module('dashboard')
.directive('jumbotron', Jumbotron);

function Jumbotron() {
  return {
    templateUrl: '/jumbotron',
    restrict: 'E'
  };
};

})();