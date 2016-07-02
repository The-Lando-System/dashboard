(function() { 'use strict';

angular.module('dashboard')
.controller('LoginController', LoginController);

LoginController.$inject = ['$http','jwtHelper','AuthService','MdlDialog','MdlUtils','MdlSnackbar', 'PreferenceService'];

function LoginController($http, jwtHelper, AuthService, MdlDialog, MdlUtils, MdlSnackbar, PreferenceService) {
	
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
				AuthService.createSession(data.token);
				loginVm.userSession = AuthService.startUserSession();
				PreferenceService.initialize();
				hideLoginDialog();
				hideDrawer();
				loginVm.loading = false;
				MdlSnackbar.success('Welcome ' + loginVm.creds.username + '!');
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