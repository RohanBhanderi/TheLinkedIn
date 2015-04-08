'use strict';
theLinkedIn.controller("EducationCtrl", function($scope, $rootScope, DataService) {

	$scope.getAllConnections = function(){
		
		var uri = urlConstants.GET_EDUCATION_DETAILS + $rootScope.userid;
		
		DataService.getData(uri,[]).success(function(response){
			$scope.educationList = response.data;
		}).error(function(err){
			console.log(err.message);
		});
	}

});
