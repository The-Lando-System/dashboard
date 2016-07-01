(function() { 'use strict';

angular.module('dashboard')
.controller('ShellController', ShellController);

ShellController.$inject = ['$scope','$rootScope','AuthService','$state'];

function ShellController($scope,$rootScope,AuthService,$state) {
	
	var shellVm = this;
    	
	shellVm.refreshWidgets = refreshWidgets;
	shellVm.isDashboard = isDashboard;
	shellVm.theme = {
		'background-image': 'url("/assets/images/default-background.jpg")',
		'background-size': 'contain'
	};

	function refreshWidgets(){
		$rootScope.$broadcast('refresh', true);
	}

	function isDashboard (){
		return ($state.current.name === 'dashboard') ? true : false;
	}

	$scope.$on('changeTheme', function(event, newTheme) {
      if (newTheme){
        shellVm.theme = newTheme;
      }
    });

};

})();