(function() { 'use strict';

angular.module('dashboard')
.controller('QuickListWidgetController', QuickListWidgetController);

QuickListWidgetController.$inject = ['QuickListFactory','AuthService'];

function QuickListWidgetController(QuickListFactory, AuthService) {
  var qlVm = this;

  qlVm.loading = false;
  qlVm.applySettingsChange = applySettingsChange;
  qlVm.addNewItem = addNewItem;
  qlVm.deleteItem = deleteItem;
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

  function deleteItem(itemToDelete){
    QuickListFactory.delete(qlVm.userSession.token,itemToDelete._id)
    .success(function(data){
      getListItems();
      qlVm.editMode = false;
      qlVm.addingNewItem = false;
      qlVm.loading = false;
    })
    .error(function(data){
      console.log(data);
      qlVm.editMode = false;
      qlVm.addingNewItem = false;
      qlVm.loading = false;
    });
  };

  function applySettingsChange(someValue){
    alert(someValue);
  };

  angular.element(document).ready(function () {
  	componentHandler.upgradeAllRegistered();
    qlVm.userSession = AuthService.startUserSession();
    getListItems();
  });

};

})();