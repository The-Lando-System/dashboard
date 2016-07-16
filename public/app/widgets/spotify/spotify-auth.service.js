(function() { 'use strict';

angular.module('dashboard')
.service('SpotifyAuthService', SpotifyAuthService);

SpotifyAuthService.$inject = ['$cookies','$rootScope'];

function SpotifyAuthService($cookies,$rootScope) {

	var spotifyAuthService = {};
	var TAG = 'SpotifyAuthService: ';

	// Function Declarations ==============================

	spotifyAuthService.getSpotifyToken = getSpotifyToken;
	spotifyAuthService.login = login;

	spotifyAuthService.token = false;

	initialize();

	// Function Implementations ===========================

	function initialize(){
		var token = $cookies.get('spotifyToken');
		spotifyAuthService.token = token ? token : false;
	}

	function getSpotifyToken(){
		return spotifyAuthService.token;
	}

	function login(){
		return false;
	}


	return spotifyAuthService;

};

})();