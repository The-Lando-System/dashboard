(function() { 'use strict';

angular.module('dashboard')
.service('AuthService', AuthService);

AuthService.$inject = ['$cookies','jwtHelper','$rootScope'];

function AuthService($cookies,jwtHelper,$rootScope) {

	var authService = {};
	var TAG = 'AuthService: ';

	// Function Declarations ==============================

	authService.getUserSession = getUserSession;
	authService.login = login;
	authService.logout = logout;

	initialize();

	// Function Implementations ===========================

	function initialize(){
		authService.userSession = {
			token    : false,
			user     : false,
			isAdmin  : false
		};

		var userToken = $cookies.get('token');
	    if (userToken){
	    	createUserSession(userToken);
	    }
	}

	function getUserSession(){
		return authService.userSession;
	}

	function login(token){
		if (token){
			$cookies.put('token',token);
			createUserSession(token);
			return true;
		} else {
			console.warn(TAG + 'Failed to set the token cookie!');
			return false
		}
	}


	function logout(){
		$cookies.remove('token');
		initialize();
	}


	function createUserSession(token){

		var user = jwtHelper.decodeToken(token)._doc;
		var isAdmin = false;

		if (user.role){
			isAdmin = (user.role === 'admin') ? true : false;
		} else {
			console.warn(TAG + 'Could not get the role from the user!')
		}

		authService.userSession = {
			token    : token,
			user     : user,
			isAdmin  : isAdmin
		}
	}

	return authService;

};

})();