'use strict';
theLinkedIn.controller("OrgHomeController", function($scope, $location, DataService,$rootScope) {

	$scope.templateView = "templates/orgprofile.html";
	$scope.showTabData = true;
	
	$scope.loadData = function() {
		
		$scope.selectedInput = undefined;
		$scope.userDropdownOptions = ['Logout'];
		
		$scope.searchUserNames();
		getUserConnectionRequests();
	}
	
	
	$scope.searchUserNames = function(){
		DataService.getData(urlConstants.GET_ALL_USERS, []).success(
				function(response) {
					$scope.searchInputs = response.data;
				}).error(function(err) {
					console.log("Error while fetching search box data");
				});
	}
	
	$scope.userDropdownSelected = function(optionSelected){
		if(optionSelected === "Logout"){
			var params = {
					email : $rootScope.userid
			}
			DataService.postData(urlConstants.LOGOUT, params).success(
				function(response) {
					$location.path('/logout');
				}).error(function(err) {
					console.log("Error while session validity");
			});
		}
	}
	
	$scope.selectedConnectionRequest = function(request){
		$scope.selectedInput = request;
		$scope.$parent.showTabData = false;
	}
	
	$scope.acceptRequest = function(request){
		
		var params = {
				firstUser : request.email,
				secondUser : $rootScope.userid
		};
		
		DataService.postData(urlConstants.ACCEPT_CONNECTION_REQUEST,params).success(function(response){
			getUserConnectionRequests();
		}).error(function(err){
			console.log(err.message);
		});
	}
	
	$scope.declineRequest = function(request){
		var params = {
				firstUser : request.email,
				secondUser : $rootScope.userid
		};
		DataService.postData(urlConstants.REJECT_CONNECTION_REQUEST,params).success(function(response){
			getUserConnectionRequests();
		}).error(function(err){
			console.log(err.message);
		});
	}
	
	
	$scope.tabActive = function(tabName){
		$scope.selectedInput = "";
		$scope.showTabData = true;
		$scope.templateView = "templates/"+tabName + ".html";
	}
	
	$scope.getTemplate = function(){
		return $scope.templateView;
	}
	
	$scope.showSearchResult = function(){
		if($scope.selectedInput){
			if($scope.selectedInput.name !== $rootScope.userName){
				$scope.$parent.showTabData = false;
			}
		}
	}
	
	function getUserConnectionRequests(){
		var uri = urlConstants.GET_USER_CONNECTION_REQUEST + $rootScope.userid;
		DataService.getData(uri, []).success(
				function(response) {
					$scope.$parent.userConnectionRequests = response.data;
				}).error(function(err) {
					console.log("Error while fetching pending requests");
		});
	}
});