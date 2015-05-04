'use strict';
theLinkedIn.controller("CareerPathCtrl", function($scope, $rootScope, 
	DataService,$log) {

	$scope.getCareerPath = function(){
		
		var uri = urlConstants.GET_CAREER_PATH + $scope.position;
		
		DataService.getData(uri,[]).success(function(response){
			if(response){
				$scope.path1 = response.data[0].path1;
				$scope.path2 = response.data[0].path2;
				console.log("path1:" + JSON.stringify($scope.path1));
				console.log("path2:" + JSON.stringify($scope.path2));
			}else{
				$scope.connectionList = [{name:response.message}];
			}
		}).error(function(err){
			console.log(err.message);
		});
	}

  


});
