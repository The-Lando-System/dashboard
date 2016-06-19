(function() { 'use strict';

angular.module('dashboard')
.factory('QuickListFactory', QuickListFactory);

QuickListFactory.$inject = ['$http'];

function QuickListFactory($http) {
	return {
        get : function(token) {
            return $http.get('/user/list', {
            	headers: { 'x-access-token': token }
            });
        },
        post : function(token,listItem) {
            return $http.post('/user/list', listItem, {
    			headers: { 'x-access-token': token }
    		});
        },
        delete : function(token,id) {
            return $http.delete('/user/list/' + id, {
            	headers: { 'x-access-token': token }
            });
        },
        edit : function(token,listItem) {
            return $http.put('/user/list', listItem, {
                headers: { 'x-access-token': token }
            });
        }
    }
};

})();