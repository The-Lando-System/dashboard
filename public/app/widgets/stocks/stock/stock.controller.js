(function() { 'use strict';

angular.module('dashboard')
.controller('StockController', StockController);

StockController.$inject = ['$http','$scope','MdlSnackbar'];

function StockController($http, $scope, MdlSnackbar) {
  var stockVm = this;

  stockVm.changeStockId = changeStockId;
  stockVm.stockId = $scope.stockId;
  stockVm.loading = false;
  stockVm.errorMessage = false;

  $scope.$on('refresh', function(event, success) {
    if (success){
      getStockInfo();
    }
  });


  function getStockInfo(requestDate){

    stockVm.loading = true;

    var today = new Date();

    // If provided a date, base our query off of that
    if (requestDate){
      today = new Date(requestDate);
    } else {
      requestDate = getShortDate(today);
    }
    

    var beginDate = getShortDate(new Date(today.getTime() - 24*60*60*1000));

    // If it's Monday
    if (today.getDay() === 1){

      var beginDate = getShortDate(new Date(today.getTime() - 3*24*60*60*1000));

    // If it's Sunday
    } else if (today.getDay() === 0) {

      var beginDate = getShortDate(new Date(today.getTime() - 2*24*60*60*1000));

    // If it's Saturday
    } else if (today.getDay() === 6) {

      var beginDate = getShortDate(new Date(today.getTime() - 24*60*60*1000));

    }

    var stocksUrl = "https://www.quandl.com/api/v3/datasets/WIKI/" + stockVm.stockId + ".json?api_key=s3pgWPGqafd8EmDtVyCo&start_date=" + beginDate;
    
    $http.get(stocksUrl)
    .success(function(data){

      if (requestDate !== data.dataset.newest_available_date){
        getStockInfo(data.dataset.newest_available_date);
        return;
      }

      stockVm.stockCode = data.dataset.dataset_code
      stockVm.stockName = data.dataset.name.substring(0,(data.dataset.name.indexOf(stockVm.stockId) - 1));
    
      stockVm.todaysClose = data.dataset.data[0][4];
      stockVm.yesterdaysClose = data.dataset.data[1][4];
      stockVm.changeAmount = (stockVm.todaysClose - stockVm.yesterdaysClose).toFixed(2);
      stockVm.increase = (stockVm.changeAmount > 0 ) ? true : false;

      stockVm.loading = false;

    })
    .error(function(data){
      console.log(data);
      stockVm.errorMessage = 'Error getting stock data for ' + stockVm.stockId;
      MdlSnackbar.error(stockVm.errorMessage);
      stockVm.loading = false;
    });

  }

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