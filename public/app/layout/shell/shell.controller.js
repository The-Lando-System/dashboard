(function() { 'use strict';

angular.module('dashboard')
.controller('ShellController', ShellController);

ShellController.$inject = ['$scope','$rootScope','AuthService','$state'];

function ShellController($scope,$rootScope,AuthService,$state) {
	
	var shellVm = this;
    	
	shellVm.refreshWidgets = refreshWidgets;
	shellVm.isDashboard = isDashboard;

	function refreshWidgets(){
		$rootScope.$broadcast('refresh', true);
	}

	function isDashboard (){
		return ($state.current.name === 'dashboard') ? true : false;
	}


};

})();