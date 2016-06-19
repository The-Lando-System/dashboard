(function() { 'use strict';

angular.module('dashboard')
.factory('ConfirmDialogService', ConfirmDialogService);

ConfirmDialogService.$inject = [];

function ConfirmDialogService() {

	var confirmDialogService = {};

	var confirmDialog;

	confirmDialogService.showConfirm = function(id) {
		if(!confirmDialog){
  			confirmDialog = document.querySelector('#confirm-dialog-' + id);
  		}
  		confirmDialog.showModal();
	};

	confirmDialogService.hideConfirm = function(id) {
		if(!confirmDialog){
  			confirmDialog = document.querySelector('#confirm-dialog-' + id);
  		}
  		confirmDialog.close();
	};

	
	return confirmDialogService;

};

})();