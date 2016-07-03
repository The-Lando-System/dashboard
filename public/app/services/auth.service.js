(function() { 'use strict';

angular.module('dashboard')
.factory('AuthService', AuthService);

AuthService.$inject = ['$cookies','$location','jwtHelper','$rootScope'];

function AuthService($cookies,$location,jwtHelper,$rootScope) {

	var authService = {};

	authService.startUserSession = function() {
		var token = $cookies.get('token') ? $cookies.get('token') : false;
		var user = token ? jwtHelper.decodeToken(token)._doc : false;
		var isAdmin = false;
		if (user.role){
			isAdmin = user.role === 'admin' ? true : false;
		}
		return {
			token    : token,
			user     : user,
			isAdmin  : isAdmin
		};
	};

	authService.endUserSession = function() {
		return {
			token    : false,
			user     : false,
			isAdmin  : false
		};
	};

	authService.logout = function(){
		$cookies.remove('token');
		$rootScope.$broadcast('logout', true);
		$rootScope.$broadcast('refresh', true);
		$location.path('dashboard');
	};

	authService.createSession = function(token){
		$cookies.put('token',token);
		$rootScope.$broadcast('login', true);
	};

	return authService;

};

})();