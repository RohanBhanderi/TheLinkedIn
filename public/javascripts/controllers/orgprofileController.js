'use strict';
theLinkedIn.controller("OrgProfileController", function($scope, $rootScope, $modal,
		$location, DataService) {

	$scope.getAllData = function() {
		
		getUserDetails();
	}
	
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
	
	/**
	 * Function to get user profile details
	 */
	function getUserDetails(){
		var uri = urlConstants.GET_ORG_USER_DETAILS+$rootScope.userid;
		DataService.getData(uri,[]).success(function(response){
			console.log(response.data);
			$scope.myProperties = response.data[0];
		}).error(function(err){
			console.log(err.message);
		});
	}

});