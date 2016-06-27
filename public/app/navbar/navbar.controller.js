(function() { 'use strict';

angular.module('dashboard')
.controller('NavbarController', NavbarController);

NavbarController.$inject = ['AuthService','$scope','ConfirmDialogService','MdlDialog','MdlUtils'];

function NavbarController(AuthService,$scope,ConfirmDialogService,MdlDialog,MdlUtils) {
  
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
    // if(!loginDialog){
    //     loginDialog = document.querySelector('#login-dialog');
    //   }
    //   loginDialog.showModal();
    MdlDialog.open('login');
  };

  function hideLoginDialog(){
    // if(!loginDialog){
    //     loginDialog = document.querySelector('#login-dialog');
    //   }
    //   loginDialog.close();
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
      //hideConfirm();
      if (confirmed){
        AuthService.logout();
        navVm.userSession = AuthService.endUserSession();
        hideDrawer();
      }
    });
    
  };

  function hideDrawer(){
    //document.body.querySelector('.mdl-layout__obfuscator.is-visible').click();
    MdlUtils.closeDrawer();
  }

  angular.element(document).ready(function () {
    navVm.userSession = AuthService.startUserSession();
    componentHandler.upgradeAllRegistered();
  });
  
};

})();