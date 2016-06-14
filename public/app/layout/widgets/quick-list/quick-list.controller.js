(function() { 'use strict';

angular.module('dashboard')
.controller('QuickListWidgetController', QuickListWidgetController);

QuickListWidgetController.$inject = [];

function QuickListWidgetController() {
  var qlVm = this;

  qlVm.listName = "My Quick List";

  qlVm.loading = false;
  qlVm.applySettingsChange = applySettingsChange;
  qlVm.hideSettingsDialog = hideSettingsDialog;
  qlVm.showSettingsDialog = showSettingsDialog;


  function applySettingsChange(newListName){
    qlVm.listName = newListName;
  };

  var settingsDialog;

  function showSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog-ql');
    }
    settingsDialog.showModal();
  };

  function hideSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog-ql');
    }
    settingsDialog.close();
  };

  angular.element(document).ready(function () {
  	componentHandler.upgradeAllRegistered();
  });

};

})();