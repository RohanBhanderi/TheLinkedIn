'use strict';
theLinkedIn.controller("ConnectionCtrl", function($scope, $rootScope, DataService) {

	$scope.getAllConnections = function(){
		
		var uri = urlConstants.GET_ALL_CONNECTIONS + $rootScope.userid;
		
		DataService.getData(uri,[]).success(function(response){
			if(response.data){
				console.log("All conns: " + response.data);
				$scope.connectionList = response.data;
			}else{
				$scope.connectionList = [{name:response.message}];
			}
		}).error(function(err){
			console.log(err.message);
		});
	}
});
