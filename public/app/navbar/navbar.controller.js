(function() { 'use strict';

angular.module('dashboard')
.controller('NavbarController', NavbarController);

NavbarController.$inject = ['AuthService','$scope','MdlDialog','MdlUtils'];

function NavbarController(AuthService, $scope, MdlDialog, MdlUtils) {
  
  var navVm = this;
  navVm.logout = logout;

  navVm.showLoginDialog = showLoginDialog;
  navVm.hideLoginDialog = hideLoginDialog;
  navVm.hideDrawer = hideDrawer;
  navVm.openThemeDialog = openThemeDialog;

  function showLoginDialog(){
    MdlDialog.open('login');
  };

  function hideLoginDialog(){
    MdlDialog.close('login')
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
    MdlDialog.confirm('Logout','Are you sure you want to logout?',function(confirmed){
      if (confirmed){
        AuthService.logout();
        navVm.userSession = AuthService.endUserSession();
        hideDrawer();
      }
    });
    
  };

  function hideDrawer(){
    MdlUtils.closeDrawer();
  }

  function openThemeDialog(){
    MdlDialog.open('theme-changer');
  }

  angular.element(document).ready(function () {
    navVm.userSession = AuthService.startUserSession();
    componentHandler.upgradeAllRegistered();
  });
  
};

})();