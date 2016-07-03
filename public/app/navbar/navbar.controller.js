(function() { 'use strict';

angular.module('dashboard')
.controller('NavbarController', NavbarController);

NavbarController.$inject = ['AuthService','$scope','MdlDialog','MdlUtils','PreferenceService','$rootScope','$location'];

function NavbarController(AuthService, $scope, MdlDialog, MdlUtils, PreferenceService, $rootScope, $location) {
  
  var navVm = this;

  // Initialization ====================

  navVm.logout = logout;
  navVm.showLoginDialog = showLoginDialog;
  navVm.hideLoginDialog = hideLoginDialog;
  navVm.hideDrawer = hideDrawer;
  navVm.openThemeDialog = openThemeDialog;

  initialize();

  function initialize(){
    componentHandler.upgradeAllRegistered();
    navVm.userSession = AuthService.getUserSession();
    
  }

  // Function Implementations ==============================

  function showLoginDialog(){
    MdlDialog.open('login');
  };

  function hideLoginDialog(){
    MdlDialog.close('login')
  };

  function logout(){
    MdlDialog.confirm('Logout','Are you sure you want to logout?',function(confirmed){
      if (confirmed){
        PreferenceService.removePrefCookie();
        AuthService.logout();
        navVm.userSession = AuthService.getUserSession();
        hideDrawer();

        $rootScope.$broadcast('logout', true);
        $rootScope.$broadcast('refresh', true);
        $location.path('dashboard');
      }
    });
    
  };

  function hideDrawer(){
    MdlUtils.closeDrawer();
  }

  function openThemeDialog(){
    MdlDialog.open('theme-changer');
  }

  // Listen for broadcast events =============================

  $scope.$on('login', function(event, success) {
    if (success){
      navVm.userSession = AuthService.getUserSession();
    }
  });
  
};

})();