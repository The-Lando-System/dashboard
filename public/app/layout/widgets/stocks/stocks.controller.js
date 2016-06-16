(function() { 'use strict';

angular.module('dashboard')
.controller('StocksWidgetController', StocksWidgetController);

StocksWidgetController.$inject = ['$http'];

function StocksWidgetController($http) {
  var stocksVm = this;

  stocksVm.loading = false;
  stocksVm.errorMessage = false;
  stocksVm.changeStockId = changeStockId;
  stocksVm.stockId = "NFLX";

  getStockInfo();


  function getStockInfo(requestDate){
  	stocksVm.loading = true;
    stocksVm.errorMessage = false;

    if (!requestDate){
  		requestDate = getShortDate(new Date());
    }
    var yesterdaysDate = getShortDate(new Date((new Date(requestDate)).getTime() - 24*60*60*1000));
  	
  	var stocksUrl = "https://www.quandl.com/api/v3/datasets/WIKI/" + stocksVm.stockId + ".json?api_key=s3pgWPGqafd8EmDtVyCo&start_date=" + yesterdaysDate;
  	
  	$http.get(stocksUrl)
    .success(function(data){

  	  if (data.dataset.newest_available_date !== requestDate){
  	  	getStockInfo(data.dataset.newest_available_date);
  	  } else {

        stocksVm.stockCode = data.dataset.dataset_code
        stocksVm.stockName = data.dataset.name.substring(0,(data.dataset.name.indexOf(stocksVm.stockId) - 1));
      
        stocksVm.todaysClose = data.dataset.data[0][4];
        stocksVm.yesterdaysClose = data.dataset.data[1][4];
        stocksVm.changeAmount = (stocksVm.todaysClose - stocksVm.yesterdaysClose).toFixed(2);
        stocksVm.increase = (stocksVm.changeAmount > 0 ) ? true : false;

        stocksVm.loading = false;
        
  	  }

    })
    .error(function(data){
      stocksVm.errorMessage = "Could not get data for the given stock ID!";
      stocksVm.loading = false;
    });
  };

  function setStockData(data){

  };

  function changeStockId(newStockId){
  	stocksVm.stockId = newStockId;
  	getStockInfo();
  };

  angular.element(document).ready(function () {
  	componentHandler.upgradeAllRegistered();
  });

  function getShortDate(date){
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate.toISOString().slice(0, 10);
  }

};

})();