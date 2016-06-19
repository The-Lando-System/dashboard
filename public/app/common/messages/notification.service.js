(function() { 'use strict';

angular.module('dashboard')
.factory('NotificationService', NotificationService);

NotificationService.$inject = [];

function NotificationService() {

	var notificationService = {};

	notificationService.showSnackbar = function(message,timeToLive){
		var snackbarContainer = document.querySelector('#notification-snackbar');
		var data = {
			message: message,
			timeout: timeToLive
		};
		snackbarContainer.MaterialSnackbar.showSnackbar(data);
	};
	
	return notificationService;

};

})();