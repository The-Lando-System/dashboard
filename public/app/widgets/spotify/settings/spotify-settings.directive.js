(function() { 'use strict';

angular.module('dashboard')
.directive('spotifyWidgetSettings', SpotifyWidgetSettings);

function SpotifyWidgetSettings() {
  return {
    templateUrl: '/spotify-widget-settings',
    controller: 'WidgetContainerController',
    controllerAs: 'widgetContainerVm',
    restrict: 'E'
  };
};

})();