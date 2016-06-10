(function() { 'use strict';

angular.module('dashboard')
.controller('StocksWidgetController', StocksWidgetController);

StocksWidgetController.$inject = ['$http'];

function StocksWidgetController($http) {
  var stocksVm = this;

  stocksVm.loading = false;

  var now = new Date();
  var today = new Date(now.getTime() - now.getTimezoneOffset()*60*1000);

  var stocksUrl = "https://www.quandl.com/api/v3/datasets/EOD/NFLX.json?api_key=s3pgWPGqafd8EmDtVyCo&start_date=" + today.toISOString().slice(0, 10);

  $http.get(stocksUrl)
  .success(function(data){
  	stocksVm.stockData = data.dataset;
  	stocksVm.latestPrice = stocksVm.stockData.data[0][stocksVm.stockData.data[0].length-2];
  	stocksVm.stockCode = stocksVm.stockData.dataset_code;
  })
  .error(function(data){

  });

};

})();