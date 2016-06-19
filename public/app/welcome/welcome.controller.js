(function() { 'use strict';

angular.module('dashboard')
.controller('WelcomeController', WelcomeController);

WelcomeController.$inject = ['AuthService','$scope'];

function WelcomeController(AuthService,$scope) {
	var vm = this;
	vm.headerMessage = "Welcome to my Dashboard!";

	vm.showLoginDialog = showLoginDialog;
	vm.hideLoginDialog = hideLoginDialog;

	var loginDialog;

	function showLoginDialog(){
		if(!loginDialog){
  			loginDialog = document.querySelector('#login-dialog');
  		}
  		loginDialog.showModal();
	};

	function hideLoginDialog(){
		if(!loginDialog){
  			loginDialog = document.querySelector('#login-dialog');
  		}
  		loginDialog.close();
	};

	$scope.$on('login', function(event, success) {
	    if (success){
	      vm.userSession = AuthService.startUserSession();
	    }
	  });

   	$scope.$on('logout', function(event, success) {
	  if (success){
	    vm.userSession = AuthService.endUserSession();
	  }
	});


	angular.element(document).ready(function () {
	    vm.userSession = AuthService.startUserSession();
	});
};

})();