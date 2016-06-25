(function() { 'use strict';

angular.module('dashboard')
.controller('StockController', StockController);

StockController.$inject = ['$http','$scope'];

function StockController($http, $scope) {
  var stockVm = this;

  stockVm.changeStockId = changeStockId;
  stockVm.stockId = $scope.stockId;

  $scope.$on('refresh', function(event, success) {
    if (success){
      getStockInfo();
    }
  });


  function getStockInfo(requestDate){

    if (!requestDate){
  		requestDate = getShortDate(new Date());
    }
    var yesterdaysDate = getShortDate(new Date((new Date(requestDate)).getTime() - 24*60*60*1000));
  	
  	var stocksUrl = "https://www.quandl.com/api/v3/datasets/WIKI/" + stockVm.stockId + ".json?api_key=s3pgWPGqafd8EmDtVyCo&start_date=" + yesterdaysDate;
  	
  	$http.get(stocksUrl)
    .success(function(data){

  	  if (data.dataset.newest_available_date !== requestDate){
  	  	getStockInfo(data.dataset.newest_available_date);
  	  } else {

        stockVm.stockCode = data.dataset.dataset_code
        stockVm.stockName = data.dataset.name.substring(0,(data.dataset.name.indexOf(stockVm.stockId) - 1));
      
        stockVm.todaysClose = data.dataset.data[0][4];
        stockVm.yesterdaysClose = data.dataset.data[1][4];
        stockVm.changeAmount = (stockVm.todaysClose - stockVm.yesterdaysClose).toFixed(2);
        stockVm.increase = (stockVm.changeAmount > 0 ) ? true : false;

        
  	  }

    })
    .error(function(data){

    });
  };

  function setStockData(data){

  };

  function changeStockId(newStockId){
  	stockVm.stockId = newStockId;
  	getStockInfo();
  };

  angular.element(document).ready(function () {
  	componentHandler.upgradeAllRegistered();
    getStockInfo();
  });

  function getShortDate(date){
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate.toISOString().slice(0, 10);
  }

};

})();