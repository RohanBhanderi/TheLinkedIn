'use strict';
theLinkedIn.controller("UserRecoCtrl", function($scope, $rootScope, DataService) {

	$scope.getRecommendedUsers = function(){
		
		var uri = urlConstants.GET_USER_RECOMMENDATION + $rootScope.userid;
		
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
