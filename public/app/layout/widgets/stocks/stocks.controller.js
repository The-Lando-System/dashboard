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


  function getStockInfo(requestDate){
  	if (!requestDate){
  		var now = new Date();
	  	var today = new Date(now.getTime() - now.getTimezoneOffset()*60*1000);
	  	requestDate = today.toISOString().slice(0, 10);
  	} 
  	
    //var stocksUrl = "https://www.quandl.com/api/v3/datasets/EOD/" + stocksVm.stockId + ".json?start_date=" + requestDate;
  	var stocksUrl = "https://www.quandl.com/api/v3/datasets/WIKI/" + stocksVm.stockId + ".json?api_key=s3pgWPGqafd8EmDtVyCo&start_date=" + requestDate;
  	stocksVm.loading = true;
  	$http.get(stocksUrl)
    .success(function(data){

  	  if (data.dataset.newest_available_date != requestDate){
  	  	getStockInfo(data.dataset.newest_available_date);
  	  } else {
  	  	stocksVm.stockName = data.dataset.name;

  	    stocksVm.stockName = stocksVm.stockName.substring(0,(stocksVm.stockName.indexOf(stocksVm.stockId) - 1));

  	    stocksVm.startPrice = data.dataset.data[0][1];
  	    stocksVm.latestPrice = data.dataset.data[0][4];
  	    stocksVm.increase = ((stocksVm.latestPrice - stocksVm.startPrice) > 0 ) ? true : false;
  	    stocksVm.stockCode = data.dataset.dataset_code
  	    stocksVm.loading = false;
  	  }

    })
    .error(function(data){

    });
  };

  function setStockData(data){

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