(function() { 'use strict';

angular.module('dashboard')
.controller('StocksWidgetController', StocksWidgetController);

StocksWidgetController.$inject = [];

function StocksWidgetController() {
  var stocksVm = this;

  stocksVm.changeStockIds = changeStockIds;
  stocksVm.stockIds = ["NFLX","LMT"];

  function changeStockIds(newStockIds){
  	stocksVm.stockIds = [];
  	var newIds = newStockIds.split(',');
  	for (var i=0; i<newIds.length; i++){
  		stocksVm.stockIds.push(newIds[i].trim());
  	}
  };

};

})();