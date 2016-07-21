(function() { 'use strict';

angular.module('dashboard')
.controller('SpotifyWidgetController', SpotifyWidgetController);

SpotifyWidgetController.$inject = ['$scope','SpotifyAuthService','$http','MdlSnackbar','$sce'];

function SpotifyWidgetController($scope,SpotifyAuthService,$http,MdlSnackbar,$sce) {
	var spotifyVm = this;
  var TAG = 'SpotifyWidgetController: ';

  // Initialization ==============================================

  spotifyVm.setUser = setUser;
  spotifyVm.selectPlaylist = selectPlaylist;

  initialize();

  function initialize(){
    componentHandler.upgradeAllRegistered();
    spotifyVm.loading = false;
    spotifyVm.spotifyToken = SpotifyAuthService.getToken();
    spotifyVm.selectedPlaylist = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:user:matt.voget:playlist:0eT9iQIPVO4xFK04teWkvn");
    if (spotifyVm.spotifyToken){
      getSpotifyUser();
    }
    
  }

  // Interface Function Implementations ==============================
  
  function setUser(userId){
    getPlaylists(userId);
  }

  function selectPlaylist(playlist){
    spotifyVm.selectedPlaylist = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=" + playlist.uri);
    spotifyVm.showPlaylists = false;
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
      if (error.error.status === 401) {
        SpotifyAuthService.refreshTokens()
        .success(function(data){
          SpotifyAuthService.saveTokens(data.access_token);
          initialize();
        })
        .error(function(error){
          console.warn(error);
        });
      }
    });
  }

  function getPlaylists(userId){
    if (!userId) { 
      MdlSnackbar.warn('Failed to get a spotify user ID! Please login to spotify.');
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