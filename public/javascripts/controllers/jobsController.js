'use strict';
theLinkedIn.controller("JobsCtrl", function($scope, $rootScope, $modal,
		$location, DataService) {

	$scope.getAllJobs = function(){
		getJobDetails();
	}

	/**
	 * Add Jobs Button Callback
	 */
	$scope.modifyJobs = function(data) {

		var mdlInstance = $modal.open({
			templateUrl : 'templates/editJobs.html',
			controller : 'EditJobsCtrl',
			size : 'lg',
			resolve : {
				isEdit : function(){
					return data;
				}
			}
		});

		mdlInstance.result.then(function(isValid) {
			if (isValid) {
				//TODO: Fetch all the Jobs details
				getJobsList();
			}
		}, function() {
		});
	};

	$scope.applyJobs = function(data){
		var jobid = data.jobid.S;
		
	};

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
