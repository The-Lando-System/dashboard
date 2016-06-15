(function() { 'use strict';

angular.module('dashboard')
.controller('QuickListWidgetController', QuickListWidgetController);

QuickListWidgetController.$inject = ['QuickListFactory','AuthService'];

function QuickListWidgetController(QuickListFactory, AuthService) {
  var qlVm = this;

  qlVm.loading = false;
  qlVm.applySettingsChange = applySettingsChange;
  qlVm.hideSettingsDialog = hideSettingsDialog;
  qlVm.showSettingsDialog = showSettingsDialog;
  qlVm.addNewItem = addNewItem;
  qlVm.addingNewItem = false;
  qlVm.listItems = [];

  function getListItems(){
    QuickListFactory.get(qlVm.userSession.token)
    .success(function(data){
      qlVm.listItems = data;
    })
    .error(function(data){
      console.log(data);
    });
  };

  function addNewItem(description){
    qlVm.loading = true;
    QuickListFactory.post(qlVm.userSession.token,{"description":description})
    .success(function(data){
      qlVm.listItems.push(data);
      qlVm.addingNewItem = false;
      qlVm.loading = false;
    })
    .error(function(data){
      console.log(data);
      qlVm.addingNewItem = false;
      qlVm.loading = false;
    });
  };

  function applySettingsChange(newListName){
    
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
    qlVm.userSession = AuthService.startUserSession();
    getListItems();
  });

};

})();