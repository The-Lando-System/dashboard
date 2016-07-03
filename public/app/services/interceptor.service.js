(function() { 'use strict';

angular.module('dashboard')
.factory('Interceptor', Interceptor);

Interceptor.$inject = ['$rootScope','AuthService','MdlDialog'];

function Interceptor($rootScope,AuthService,MdlDialog) {

	var interceptorService = {};

	interceptorService.request = function(config) { 
        return config;
    };

	interceptorService.response = function(response) {

    if (response.data.message){
      if (response.data.message === 'TokenExpiredError'){
        MdlDialog.alert('Hey','Your session has expired. Please login again!')
        AuthService.logout();
        $rootScope.$broadcast('logout', true);
        $rootScope.$broadcast('refresh', true);
      }

    }

    return response;
  };

	return interceptorService;

};

})();