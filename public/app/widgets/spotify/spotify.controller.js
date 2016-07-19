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
    if (spotifyVm.spotifyToken){
      getSpotifyUser();
    }
    
  }

  // Interface Function Implementations ==============================
  
  function setUser(userId){
    getPlaylists(userId);
  }

  // Helper Functions ==============================


  function getSpotifyUser(){
    $http.get('https://api.spotify.com/v1/me',{
      headers: { 'Authorization': 'Bearer ' + spotifyVm.spotifyToken }
    })
    .success(function(data){
      getPlaylists(data.id);
    })
    .error(function(error){
      console.warn(error);

      // TODO : Figure out how to handle token expiry based on error
      SpotifyAuthService.refreshTokens()
      .success(function(data){
        initialize();
      })
      .error(function(error){
        console.warn(error);
      });


    });
  }

  function getPlaylists(userId){
    if (!userId) { 
      MdlSnackbar.warn('Please enter a user id in the spotify widget settings!');
      return;
    }
    $http.get('https://api.spotify.com/v1/users/' + userId + '/playlists',{
      headers: { 'Authorization': 'Bearer ' + spotifyVm.spotifyToken }
    })
    .success(function(data){
      spotifyVm.playlists = data.items;
    })
    .error(function(error){
      console.warn(error);
      MdlSnackbar.error('Failed to get user\'s playlists!');
    });
  }
  

  // Listen for broadcast events =================================

  $scope.$on('getPrefs', function(event, success) {
  
  });

  $scope.$on('refresh', function(event, success) {
   initialize();
  });

  $scope.$on('logout', function(event, success) {
    
  });


};

})();