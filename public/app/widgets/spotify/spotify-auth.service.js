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
	spotifyAuthService.refreshTokens = refreshTokens;

	spotifyAuthService.token = false;
	spotifyAuthService.refreshToken = false;

	initialize();

	// Function Implementations ===========================

	function initialize(){
		var token = $cookies.get('spotifyToken');
		var refreshToken = $cookies.get('spotifyRefreshToken');
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
		spotifyAuthService.token = token;
		if (refreshToken){
			$cookies.put('spotifyRefreshToken',refreshToken);
			spotifyAuthService.refreshToken = refreshToken;
		}
	}

	function removeTokens(){
		$cookies.remove('spotifyToken');
		$cookies.remove('spotifyRefreshToken');
	}

	function refreshTokens(){
		return $http.get('/refresh_token/' + spotifyAuthService.refreshToken);
	}

	return spotifyAuthService;

};

})();