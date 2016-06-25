(function() { 'use strict';

angular.module('dashboard')
.controller('StocksWidgetController', StocksWidgetController);

StocksWidgetController.$inject = ['$http','$scope'];

function StocksWidgetController($http, $scope) {
  var stocksVm = this;

  stocksVm.loading = false;
  stocksVm.errorMessage = false;
  stocksVm.changeStockId = changeStockId;
  stocksVm.stockIds = ["NFLX","LMT"];

  

  function changeStockId(newStockId){
  	stocksVm.stockId = newStockId;
  };

};

})();