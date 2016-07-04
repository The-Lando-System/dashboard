(function() { 'use strict';

angular.module('dashboard')
.directive('spotifyWidget', SpotifyWidget);

function SpotifyWidget() {
  return {
    templateUrl: '/spotify-widget',
    restrict: 'E',
    controller: 'SpotifyWidgetController',
    controllerAs: 'spotifyVm'
  };
};

})();