(function() { 'use strict';

angular.module('dashboard')
.controller('SpotifyWidgetController', SpotifyWidgetController);

SpotifyWidgetController.$inject = ['$scope','SpotifyAuthService','$http','MdlSnackbar'];

function SpotifyWidgetController($scope,SpotifyAuthService,$http,MdlSnackbar) {
	var spotifyVm = this;
  var TAG = 'SpotifyWidgetController: ';

  // Initialization ==============================================

  spotifyVm.setUser = setUser;

  initialize();

  function initialize(){
    componentHandler.upgradeAllRegistered();
    spotifyVm.loading = false;
    spotifyVm.spotifyToken = SpotifyAuthService.getToken();
    getPlaylists();
  }

  // Interface Function Implementations ==============================
  
  function setUser(userId){
    spotifyVm.userId = userId;
    getPlaylists();
  }

  // Helper Functions ==============================

  function getPlaylists(){
    if (!spotifyVm.userId) { 
      MdlSnackbar.warn('Please enter a user id in the spotify widget settings!');
      return;
    }
    $http.get('https://api.spotify.com/v1/users/' + spotifyVm.userId + '/playlists',{
      headers: { 'Authorization': 'Bearer ' + spotifyVm.spotifyToken }
    })
    .success(function(data){
      console.log(data);
      spotifyVm.playlists = data.items;
    })
    .error(function(error){
      console.warn(error);
    });
  }

  

  // Listen for broadcast events =================================

  $scope.$on('getPrefs', function(event, success) {
  
  });

  $scope.$on('refresh', function(event, success) {
   
  });

  $scope.$on('logout', function(event, success) {
    
  });


};

})();