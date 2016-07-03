(function() { 'use strict';

angular.module('dashboard')
.service('JsUtils', JsUtils);

JsUtils.$inject = [];

function JsUtils() {

	var jsUtils = {};

	// Function Declarations =========================

	jsUtils.csvToJson = csvToJson;


	// Function Implementations =====================

	function csvToJson(csv) {

		var lines=csv.split("\n");
		var result = [];
		var headers=lines[0].split(",");

		for(var i=1;i<lines.length;i++){

			var obj = {};
			var currentline=lines[i].split(",");

			if (currentline){
				for(var j=0;j<headers.length;j++){
					obj[headers[j]] = currentline[j];
				}
			}

			result.push(obj);

		}

		return result;
	}


	return jsUtils;

};

})();