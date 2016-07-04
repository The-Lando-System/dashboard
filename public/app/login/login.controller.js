(function() { 'use strict';

angular.module('dashboard')
.controller('LoginController', LoginController);

LoginController.$inject = ['$http','AuthService','MdlDialog','MdlUtils','MdlSnackbar', 'PreferenceService','$rootScope'];

function LoginController($http, AuthService, MdlDialog, MdlUtils, MdlSnackbar, PreferenceService,$rootScope) {
	
	var loginVm = this;

	loginVm.authFail = false;
	loginVm.login = login;
	loginVm.hideLoginDialog = hideLoginDialog;
	loginVm.loading = false;

	function login(formIsValid){
		if (formIsValid){

			loginVm.loading = true;

			$http.post('/authenticate',loginVm.creds)
			.success(function(data){
				AuthService.login(data.token);
				$rootScope.$broadcast('login', true);
				loginVm.userSession = AuthService.getUserSession();
				PreferenceService.initialize();
				hideLoginDialog();
				hideDrawer();
				loginVm.loading = false;
				MdlSnackbar.notify('Welcome ' + loginVm.creds.username + '!');
				loginVm.creds = {};
			})
			.error(function(data){
				if (data.hasOwnProperty('message')){
					loginVm.errorMessage = data.message;
				} else {
					loginVm.errorMessage = 'Unknown error occurred';
				}
				console.log('Error: ' + loginVm.errorMessage);
				MdlSnackbar.error('Error: ' + loginVm.errorMessage);
				loginVm.loading = false;
			});
		}
	};

	function hideLoginDialog(){
  		MdlDialog.close('login');
	}

	function hideDrawer(){
	    MdlUtils.closeDrawer();
	}

};

})();