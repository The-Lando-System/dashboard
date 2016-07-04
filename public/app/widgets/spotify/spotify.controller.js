(function() { 'use strict';

angular.module('dashboard')
.controller('SpotifyWidgetController', SpotifyWidgetController);

SpotifyWidgetController.$inject = ['$scope'];

function SpotifyWidgetController($scope) {
	var spotifyVm = this;
  var TAG = 'SpotifyWidgetController: ';

  // Initialization ==============================================


  initialize();

  function initialize(){
    componentHandler.upgradeAllRegistered();
    spotifyVm.loading = false;
  }

  // Interface Function Implementations ==============================

  

  // Helper Functions ==============================

  

  // Listen for broadcast events =================================

  $scope.$on('getPrefs', function(event, success) {
  
  });

  $scope.$on('refresh', function(event, success) {
   
  });

  $scope.$on('logout', function(event, success) {
    
  });


};

})();