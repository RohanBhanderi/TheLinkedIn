'use strict';
theLinkedIn.controller("JobsCtrl", function($scope, $rootScope, $modal,
		$location, DataService) {

	$scope.getAllJobs = function(){
		getJobDetails();
	}

	/**
	 * ng-init for search results
	 */
	$scope.getResultData = function(value){
		$scope.jobid = $rootScope.searcedJobId;
		console.log("value" +  JSON.stringify($scope.jobid));
		getJobSearchResult();
		$rootScope.searcedJobId = null;
	}

	$scope.getAllAppliedJobs = function(){
		var uri = urlConstants.GET_ALL_APP+$rootScope.userid;
		DataService.getData(uri,[]).success(function(response){
			console.log("JobsApplied " + response);
			$scope.jobData = response;
		}).error(function(err){
			console.log(err.message);
		});
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
				getJobDetails();
			}
		}, function() {
		});
	};

	$scope.applyJobs = function(data){

		var params = {
				userid : $rootScope.userid,
				jobid :  data.jobid.S
		}
		console.log(JSON.stringify(params));
		DataService.postData(urlConstants.POST_APPLICATION, params).success(
			function(response) {
				console.log(response);
				
			}).error(function(err) {
				console.log("Error while posting application");
		});
	};

	/**
	 * Function to get job details
	 */
	function getJobDetails(){
		var uri = urlConstants.GET_JOBS;
		DataService.getData(uri,[]).success(function(response){
			console.log("Jobs " + response.result);
			$scope.jobData = response.result;
		}).error(function(err){
			console.log(err.message);
		});
	}

	/**
	 * Function to get job search details
	 */
	function getJobSearchResult() {
		
		var uri = urlConstants.GET_JOB_BY_ID+$scope.jobid
		DataService.getData(uri,[]).success(function(response){
			console.log("Jobs " + response.response);
			$scope.jobData = response.response;
		}).error(function(err){
			console.log(err.message);
		});
	}

});
