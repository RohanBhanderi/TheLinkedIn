'use strict';
theLinkedIn.controller("JobRecoCtrl", function($scope, $rootScope, DataService) {

	$scope.getRecommendedJobs = function(){
		
		var uri = urlConstants.GET_JOB_RECOMMENDATION + $rootScope.userid;
		
		DataService.getData(uri,[]).success(function(response){
			if(response){
				$scope.connectionList = response;
			}else{
				$scope.connectionList = [{name:response.message}];
			}
		}).error(function(err){
			console.log(err.message);
		});
	}
});
