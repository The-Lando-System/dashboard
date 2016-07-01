(function() { 'use strict';

angular.module('dashboard')
.controller('ThemeChangerController', ThemeChangerController);

ThemeChangerController.$inject = ['$rootScope','$scope','MdlDialog','MdlUtils'];

function ThemeChangerController($rootScope,$scope,MdlDialog,MdlUtils) {
  
  var themeVm = this;

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

  function changeTheme(theme){

  	if (!theme){
  		MdlDialog.alert('Hey','Please select a theme!');
  		return;
  	}

  	var style = {
  		'background-image': theme.image,
  		'background-size': theme.size
  	};

  	$rootScope.$broadcast('changeTheme', style);

  	closeDialog();
  	MdlUtils.closeDrawer();
  }

  function closeDialog(){
  	MdlDialog.close('theme-changer');
  }
  

};

})();