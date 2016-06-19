(function() { 'use strict';

angular.module('dashboard')
.factory('ConfirmDialogService', ConfirmDialogService);

ConfirmDialogService.$inject = [];

function ConfirmDialogService() {

	var confirmDialogService = {};

	confirmDialogService.showConfirm = function(id) {
  		var confirmDialog = document.querySelector('#confirm-dialog-' + id);
  		confirmDialog.showModal();
	};

	confirmDialogService.hideConfirm = function(id) {
  		var confirmDialog = document.querySelector('#confirm-dialog-' + id);
  		confirmDialog.close();
	};

	return confirmDialogService;

};

})();