(function() { 'use strict';

angular.module('dashboard')
.controller('LoginController', LoginController);

LoginController.$inject = ['$http','$window','$location','jwtHelper','AuthService','MdlDialog'];

function LoginController($http,$window,$location,jwtHelper,AuthService,MdlDialog) {
	
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
				if (data.success){
					AuthService.createSession(data.token);
					loginVm.userSession = AuthService.startUserSession();
					hideLoginDialog();
					hideDrawer();
					loginVm.loading = false;
				} else {
					loginVm.authFail = true;
					loginVm.errorMessage = data.message;
					loginVm.loading = false;
				}
			})
			.error(function(data){
				console.log('Error: ' + data);
				loginVm.loading = false;
			});
		}
	};

	var loginDialog;

	function hideLoginDialog(){
		// if(!loginDialog){
  // 			loginDialog = document.querySelector('#login-dialog');
  // 		}
  // 		loginDialog.close();
  		MdlDialog.close('login');
	};


	function hideDrawer(){
	    document.body.querySelector('.mdl-layout__obfuscator.is-visible').click();
	}

};

})();