'use strict';
theLinkedIn.controller("OrgProfileController", function($scope, $rootScope, $modal,
		$location, DataService) {

	$scope.getAllData = function() {
		
		getUserDetails();
		getJobDetails();
	};
	
	/**
	 * Edit profile button callback
	 */
	$scope.modifyProfile = function() {

		var editProfileModal = $modal.open({
			templateUrl : 'templates/editOrgProfile.html',
			controller : 'EditOrgProfileCtrl',
			size : 'lg',
			resolve : {
				isEdit : function(){
					return $scope.myProperties;
				}
			}
		});

		editProfileModal.result.then(function(isValid) {
			if(isValid){
				getUserDetails();
			}
		}, function() {
		});
	};

	$scope.deleteCall = function(data){
		var uri = urlConstants.DELETE_JOB;
		var params = {
					jobid : data.jobid.S
				}
		console.log(JSON.stringify(params));
		DataService.deleteData(uri,params).success(function(response){
			//$modalInstance.close(true);
			getJobDetails();
		}).error(function(err){
			//$modalInstance.close(false);
		});
	};

	
	/**
	 * Function to get user profile details
	 */
	function getUserDetails(){
		var uri = urlConstants.GET_ORG_USER_DETAILS+$rootScope.userid;
		DataService.getData(uri,[]).success(function(response){
			//console.log("Org " + response.data);
			$scope.myProperties = response.data[0];
			// if(response.data.length == 0) {
			// 	$scope.myProperties = {};
			// } else {
			// 	$scope.myProperties = response.data[0];
			// }
		}).error(function(err){
			console.log(err.message);
		});
	}

	/**
	 * Function to get job details
	 */
	function getJobDetails(){
		var uri = urlConstants.GET_JOBS;//+$rootScope.userid
		DataService.getData(uri,[]).success(function(response){
			console.log("Jobs " + response.result);
			$scope.jobData = response.result;
		}).error(function(err){
			console.log(err.message);
		});
	}
});