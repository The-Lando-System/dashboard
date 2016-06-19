(function() { 'use strict';

angular.module('dashboard')
.controller('ConfirmDialogController', ConfirmDialogController);

ConfirmDialogController.$inject = [];

function ConfirmDialogController() {
	
	var confirmVm = this;
	confirmVm.showConfirm = showConfirm;
	confirmVm.hideConfirm = hideConfirm;

	var confirmDialog;

	function showConfirm(id){
	if(!confirmDialog){
	    confirmDialog = document.querySelector('#confirm-dialog-' + id);
	  }
	  confirmDialog.showModal();
	};

	function hideConfirm(id){
	if(!confirmDialog){
	    confirmDialog = document.querySelector('#confirm-dialog-' + id);
	  }
	  confirmDialog.close();
	};

};

})();