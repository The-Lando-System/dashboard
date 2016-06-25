(function() { 'use strict';

angular.module('dashboard')
.controller('NavbarController', NavbarController);

NavbarController.$inject = ['AuthService','$scope','ConfirmDialogService'];

function NavbarController(AuthService,$scope,ConfirmDialogService) {
  
  var navVm = this;
  navVm.logout = logout;

  navVm.showConfirm = showConfirm;
  navVm.hideConfirm = hideConfirm;
  navVm.showLoginDialog = showLoginDialog;
  navVm.hideLoginDialog = hideLoginDialog;
  navVm.hideDrawer = hideDrawer;

  function showConfirm(){
    ConfirmDialogService.showConfirm('logout');
  };

  function hideConfirm(){
    ConfirmDialogService.hideConfirm('logout');
  };

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
    hideConfirm();
    AuthService.logout();
    navVm.userSession = AuthService.endUserSession();
    hideDrawer();
  };

  function hideDrawer(){
    document.body.querySelector('.mdl-layout__obfuscator.is-visible').click();
  }

  angular.element(document).ready(function () {
    navVm.userSession = AuthService.startUserSession();
    componentHandler.upgradeAllRegistered();
  });
  
};

})();