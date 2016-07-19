(function() { 'use strict';

angular.module('dashboard')
.controller('DashboardController', DashboardController);

DashboardController.$inject = ['$rootScope','$timeout','$location','$stateParams','SpotifyAuthService','MdlSnackbar'];

function DashboardController($rootScope,$timeout,$location,$stateParams,SpotifyAuthService,MdlSnackbar) {
	var dashboardVm = this;

	// Initialization ==============================================

	initialize();

	function initialize(){

		componentHandler.upgradeAllRegistered();

		// If authenticating through spotify, here is where we put your tokens in your cookies
		if ($stateParams.token && $stateParams.refresh_token){
			SpotifyAuthService.saveTokens($stateParams.token,$stateParams.refresh_token);
			$location.path('my-dashboard');
			MdlSnackbar.notify('Successfully logged into Spotify!');
			$rootScope.$broadcast('refresh', true);
		}

	}


};

})();