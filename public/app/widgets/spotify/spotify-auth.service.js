(function() { 'use strict';

angular.module('dashboard')
.service('SpotifyAuthService', SpotifyAuthService);

SpotifyAuthService.$inject = ['$http','$cookies','$rootScope'];

function SpotifyAuthService($http,$cookies,$rootScope) {

	var spotifyAuthService = {};
	var TAG = 'SpotifyAuthService: ';

	// Function Declarations ==============================

	spotifyAuthService.getToken = getToken;
	spotifyAuthService.getRefreshToken = getRefreshToken;
	spotifyAuthService.saveTokens = saveTokens;
	spotifyAuthService.removeTokens = removeTokens;

	spotifyAuthService.token = false;
	spotifyAuthService.refreshToken = false;

	initialize();

	// Function Implementations ===========================

	function initialize(){
		var token = $cookies.get('spotifyToken');
		var refreshToken = $cookies.get('refreshToken');
		spotifyAuthService.token = token ? token : false;
		spotifyAuthService.refreshToken = refreshToken ? refreshToken : false;
	}

	function getToken(){
		return spotifyAuthService.token;
	}

	function getRefreshToken(){
		return spotifyAuthService.refreshToken;
	}

	function saveTokens(token,refreshToken){
		$cookies.put('spotifyToken',token);
		$cookies.put('spotifyRefreshToken',refreshToken);
	}

	function removeTokens(){
		$cookies.remove('spotifyToken');
		$cookies.remove('spotifyRefreshToken');
	}

	return spotifyAuthService;

};

})();