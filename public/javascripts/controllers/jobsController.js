'use strict';
theLinkedIn.controller("JobsCtrl", function($scope, $rootScope, DataService) {

	$scope.getAllConnections = function(){
		
		var uri = urlConstants.GET_EMPLOYMENT_DETAILS + $rootScope.userid;
		
		DataService.getData(uri,[]).success(function(response){
			$scope.jobsList = response.data;
		}).error(function(err){
			console.log(err.message);
		});
	}
});
