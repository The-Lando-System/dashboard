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
    changeStockIds(getPrefs());
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

  function getPrefs(){
    var stockIds = PreferenceService.getPrefs('stocks')
    if (stockIds){
      return stockIds;
    } else {
      return 'NFLX';
    }
  }

  // Listen for broadcast events =================================

  $scope.$on('getPrefs', function(event, success) {
    changeStockIds(getPrefs());
  });

  $scope.$on('refresh', function(event, success) {
    changeStockIds(getPrefs());
  });

  $scope.$on('logout', function(event, success) {
    setDefaultData();
    changeStockIds(getPrefs());
  });

};

})();