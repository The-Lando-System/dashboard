(function() { 'use strict';

angular.module('dashboard')
.controller('NavbarController', NavbarController);

NavbarController.$inject = ['AuthService','$scope'];

function NavbarController(AuthService,$scope) {
  
  var navVm = this;
  navVm.logout = logout;

  navVm.showLoginDialog = showLoginDialog;
  navVm.hideLoginDialog = hideLoginDialog;

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
      navVm.userSession = AuthService.startUserSession();
    }
  });

  $scope.$on('logout', function(event, success) {
    if (success){
      navVm.userSession = AuthService.endUserSession();
    }
  });

  function logout(){
    var confirmed = confirm('Are you sure you want to logout?');
    if (confirmed){
      AuthService.logout();
      navVm.userSession = AuthService.endUserSession();
    }
  };

  angular.element(document).ready(function () {
    navVm.userSession = AuthService.startUserSession();
    componentHandler.upgradeAllRegistered();
  });
  
};

})();