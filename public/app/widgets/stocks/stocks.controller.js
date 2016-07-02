(function() { 'use strict';

angular.module('dashboard')
.controller('StocksWidgetController', StocksWidgetController);

StocksWidgetController.$inject = ['$scope','PreferenceService'];

function StocksWidgetController($scope,PreferenceService) {
  var stocksVm = this;

  initialize();

  $scope.$on('getPrefs', function(event, success) {
    if (success){
      PreferenceService.getPrefs('stocks')
      .then(function(stockIds){

        if (!stockIds){
          changeStockIds('NFLX');
        } else {
          changeStockIds(stockIds);
        }

      }, function(errorMessage){
        console.log(errorMessage);
        changeStockIds('NFLX');
      });
    }
  });

  stocksVm.changeStockIds = changeStockIds;
  stocksVm.stockIds = ["NFLX","LMT"];

  function initialize(){
    PreferenceService.getPrefs('stocks')
    .then(function(stockIds){

      if (!stockIds){
        changeStockIds('NFLX');
      } else {
        changeStockIds(stockIds);
      }

    }, function(errorMessage){
      console.log(errorMessage);
      changeStockIds('NFLX');
    });
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

};

})();