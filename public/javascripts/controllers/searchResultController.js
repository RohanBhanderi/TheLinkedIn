'use strict';
theLinkedIn.controller('SearchResultController',function($scope,DataService,$rootScope){

	/**
	 * ng-init
	 */
	$scope.getResultData = function(value){
		$scope.userDetails = value;
		getUserDetails();
		getEmploymentList();
		getEducationList();
		getSkillsList();
		getConnection();
	}
	
	$scope.connectUsers = function(){
		
		var params = {
				firstUser : $rootScope.userid,
				secondUser : $scope.userDetails.email
		};
		
		DataService.postData(urlConstants.CONNECT_USERS,params).success(function(response){
			$scope.isConnected = true;
			$scope.connectionStatus = "Request Pending";
		}).error(function(err){
			$scope.connectionStatus = err.message;
		});
	}
	
	
	/**
	 * Function to get user profile details
	 */
	function getUserDetails(){
		
		var uri = urlConstants.GET_USER_DETAILS+$scope.userDetails.email;
		DataService.getData(uri,[]).success(function(response){
			$scope.userProperties = response.data[0];
		}).error(function(err){
			console.log(err.message);
		});
	}
	
	/**
	 * Function for getting Employment data for the user
	 */
	function getEmploymentList() {
		var uriEmployment = urlConstants.GET_EMPLOYMENT_DETAILS
				+ $scope.userDetails.email;

		DataService.getData(uriEmployment, []).success(function(response) {
			$scope.userEmploymentData = response.data;
		}).error(function(err) {
			console.log(err);
		});
	}
	
	/**
	 * Function for getting Education data for the user
	 */
	function getEducationList() {
		var uriEducation = urlConstants.GET_EDUCATION_DETAILS
				+ $scope.userDetails.email;
		DataService.getData(uriEducation, []).success(function(response) {
			$scope.userEducationData = response.data;
		}).error(function(err) {
			console.log(err);
		});
	}
	
	/**
	 * Function for getting Skills data for the user
	 */
	function getSkillsList() {
		var uriSkills = urlConstants.GET_SKILLS_DETAILS + $scope.userDetails.email;
		DataService.getData(uriSkills, []).success(function(response) {
			$scope.userSkillsData = response.data;
		}).error(function(err) {
			console.log(err);
		});
	}
	
	/**
	 * Function for checking connection
	 */
	function getConnection(){
		
		var uri = urlConstants.CHECK_CONNECTION +$rootScope.userid + "/"+$scope.userDetails.email;
		
		DataService.getData(uri,[]).success(function(response){
			if(response.data.length==0){
				$scope.isConnected = false;
			}else{
				switch(response.data[0].status){
					case "pending": 
									$scope.connectionStatus = "Request Pending";
									$scope.isConnected = true;
									break;
					case "active": 
									$scope.connectionStatus = "Connected";
									$scope.isConnected = true;
									break;
					case "default":
									$scope.isConnected = false;
									break;
				}
			}
		}).error(function(err){
			console.log(err);
		});
	}
});