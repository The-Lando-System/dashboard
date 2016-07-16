(function() { 'use strict';

angular.module('dashboard')
.service('SpotifyAuthService', SpotifyAuthService);

SpotifyAuthService.$inject = ['$cookies','$rootScope'];

function SpotifyAuthService($cookies,$rootScope) {

	var spotifyAuthService = {};
	var TAG = 'SpotifyAuthService: ';

	// Function Declarations ==============================

	initialize();

	// Function Implementations ===========================

	function initialize(){
		
	}

	return spotifyAuthService;

};

})();