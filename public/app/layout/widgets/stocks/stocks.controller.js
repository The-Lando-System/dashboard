(function() { 'use strict';

angular.module('dashboard')
.controller('StocksWidgetController', StocksWidgetController);

StocksWidgetController.$inject = ['$http'];

function StocksWidgetController($http) {
  var stocksVm = this;

  stocksVm.loading = false;
  stocksVm.applyChanges = applySettingsChange;
  stocksVm.cancel = hideSettingsDialog;
  stocksVm.openSettings = showSettingsDialog;
  stocksVm.stockId = "NFLX";

  getStockInfo();


  function getStockInfo(){
  	var now = new Date();
  	var today = new Date(now.getTime() - now.getTimezoneOffset()*60*1000);
  	var stocksUrl = "https://www.quandl.com/api/v3/datasets/EOD/" + stocksVm.stockId + ".json?api_key=s3pgWPGqafd8EmDtVyCo&start_date=" + today.toISOString().slice(0, 10);
  	stocksVm.loading = true;
  	$http.get(stocksUrl)
    .success(function(data){

  	  stocksVm.stockData = data.dataset;
  	  stocksVm.stockName = data.dataset.name;
  	  stocksVm.stockName = stocksVm.stockName.substring(0,(stocksVm.stockName.indexOf(stocksVm.stockId) - 1));

  	  stocksVm.startPrice = stocksVm.stockData.data[0][1];
  	  stocksVm.latestPrice = stocksVm.stockData.data[0][stocksVm.stockData.data[0].length-2];
  	  stocksVm.increase = ((stocksVm.latestPrice - stocksVm.startPrice) > 0 ) ? true : false;
  	  stocksVm.stockCode = stocksVm.stockData.dataset_code
  	  stocksVm.loading = false;
    })
    .error(function(data){

    });
  };

  function applySettingsChange(newStockId){
  	stocksVm.stockId = newStockId;
  	getStockInfo();
  	hideSettingsDialog();
  };

  var settingsDialog;

  function showSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog-stocks');
    }
    settingsDialog.showModal();
  };

  function hideSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog-stocks');
    }
    settingsDialog.close();
  };

  angular.element(document).ready(function () {
  	componentHandler.upgradeAllRegistered();
  });

};

})();