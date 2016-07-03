(function() { 'use strict';

angular.module('dashboard')
.controller('ThemeChangerController', ThemeChangerController);

ThemeChangerController.$inject = ['$rootScope','$scope','MdlDialog','MdlUtils','PreferenceService','AuthService'];

function ThemeChangerController($rootScope,$scope,MdlDialog,MdlUtils,PreferenceService,AuthService) {
  
  var themeVm = this;

  // Initialization ==============================================

  themeVm.closeDialog = closeDialog;
  themeVm.changeTheme = changeTheme;

  initialize();

  function initialize(){

    themeVm.themes = [
    {
      name: 'Default',
      preview: '/assets/images/default-background.jpg',
      image: 'url("/assets/images/default-background.jpg")',
      size: 'contain'

      },
      {
      name: 'Dark',
      preview: '/assets/images/dark-background.jpg',
      image: 'url("/assets/images/dark-background.jpg")',
      size: 'cover'

      },
      {
      name: 'Grey',
      preview: '/assets/images/grey-background.jpg',
      image: 'url("/assets/images/grey-background.jpg")',
      size: 'contain'

      },
      {
      name: 'Orange',
      preview: '/assets/images/orange-background.jpg',
      image: 'url("/assets/images/orange-background.jpg")',
      size: 'cover'

      }
    ];

    themeVm.userSession = AuthService.startUserSession();

    if (!themeVm.userSession.user){
      setTheme(findThemeByName('Default'));
    } else {
      setTheme(findThemeByName(PreferenceService.getPrefs('theme','Default')));
    }
    
  }

  
  
  // Interface Function Implementations ==============================
  
  function changeTheme(theme){

    if (!theme){
      MdlDialog.alert('Hey','Please select a theme!');
      return;
    }

    setTheme(theme);

    closeDialog();
    MdlUtils.closeDrawer();
  }

  function closeDialog(){
    MdlDialog.close('theme-changer');
  }


  // Helper Functions ==============================

  function setTheme(theme) {

    var style = {
      'background-image': theme.image,
      'background-size': theme.size
    };

    PreferenceService.setPrefs({
      name: 'theme',
      value: theme.name
    });

    $rootScope.$broadcast('changeTheme', style);
    return;

  }


  function findThemeByName(themeName){
    for (var i=0; i<themeVm.themes.length; i++){
      if (themeVm.themes[i].name === themeName){
        return themeVm.themes[i];
      }
    }
    return false;
  }


  // Listen for broadcast events =================================

  $scope.$on('getPrefs', function(event, success) {
    setTheme(findThemeByName(PreferenceService.getPrefs('theme','Default')));
  });
  
  $scope.$on('refresh', function(event, success) {
    setTheme(findThemeByName(PreferenceService.getPrefs('theme','Default')));
  });

  $scope.$on('logout', function(event, success) {
    initialize();
  });

};

})();