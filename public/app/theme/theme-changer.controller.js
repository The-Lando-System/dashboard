(function() { 'use strict';

angular.module('dashboard')
.controller('ThemeChangerController', ThemeChangerController);

ThemeChangerController.$inject = ['$rootScope','$scope','MdlDialog','MdlUtils','PreferenceService'];

function ThemeChangerController($rootScope,$scope,MdlDialog,MdlUtils,PreferenceService) {
  
  var themeVm = this;

  initialize();

  themeVm.closeDialog = closeDialog;
  themeVm.changeTheme = changeTheme;
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

  $scope.$on('getPrefs', function(event, success) {
    if (success){
      PreferenceService.getPrefs('theme')
      .then(function(themeName){

        if (!themeName){
          changeTheme('Default');
        } else {
          changeTheme(themeName);
        }

      }, function(errorMessage){
        console.log(errorMessage);
        changeTheme('Default');
      });
    }
  });

  function initialize(){
    PreferenceService.getPrefs('theme')
    .then(function(themeName){

      if (!themeName){
        setTheme(findThemeByName('Default'));
      } else {
        setTheme(findThemeByName(themeName));
      }

    }, function(errorMessage){
      console.log(errorMessage);
      setTheme(findThemeByName('Default'));
    });
  }

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

  function findThemeByName(themeName){
    for (var i=0; i<themeVm.themes.length; i++){
      if (themeVm.themes[i].name === themeName){
        return themeVm.themes[i];
      }
    }
    return false;
  }
  

};

})();