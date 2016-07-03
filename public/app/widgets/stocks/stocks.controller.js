(function() { 'use strict';

angular.module('dashboard')
.controller('StocksWidgetController', StocksWidgetController);

StocksWidgetController.$inject = ['$scope','PreferenceService'];

function StocksWidgetController($scope,PreferenceService) {
  var stocksVm = this;

  // Initialization ==============================================

  stocksVm.changeStockIds = changeStockIds;

  initialize();

  function initialize(){
    changeStockIds(PreferenceService.getPrefs('stocks','NFLX'));
  }

  // Helper Functions ==============================

  function setDefaultData(){
    stocksVm.stockIds = ["NFLX","LMT"];
  }
  
  function changeStockIds(newStockIds){

    PreferenceService.setPrefs({
      name: 'stocks',
      value: newStockIds
    });
    
  	stocksVm.stockIds = [];
  	var newIds = newStockIds.split(',');
  	for (var i=0; i<newIds.length; i++){
  		stocksVm.stockIds.push(newIds[i].trim());
  	}
  };

  // Listen for broadcast events =================================

  $scope.$on('getPrefs', function(event, success) {
    changeStockIds(PreferenceService.getPrefs('stocks','NFLX'));
  });

  $scope.$on('refresh', function(event, success) {
    changeStockIds(PreferenceService.getPrefs('stocks','NFLX'));
  });

  $scope.$on('logout', function(event, success) {
    setDefaultData();
    changeStockIds(PreferenceService.getPrefs('stocks','NFLX'));
  });

};

})();