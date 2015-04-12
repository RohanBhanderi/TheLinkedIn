'use strict';
theLinkedIn.controller("EditOrgProfileCtrl", function($scope, $modalInstance,isEdit,$rootScope,DataService,$window) {
	//console.log("isEdit: " + isEdit + ":: typeof isEdit: "+ (typeof isEdit));
	if(isEdit) {
		$scope.motto = isEdit.motto.S;
		$scope.url = isEdit.url.S;
		$scope.overview = isEdit.overview.S;
	} else {
		$scope.motto = "";
		$scope.url = "";
		$scope.overview = "";
	}

	$scope.okay = function() {
		if($scope.motto === "" || $scope.url=== "" || $scope.overview === ""){
			$scope.formError = "Form Invalid !!!";
		}else{
						
			var params = {
					userid : $rootScope.userid,
					email : $rootScope.email,
					motto : $scope.motto,
					url : $scope.url,
					overview : $scope.overview
			};
			
			DataService.putData(urlConstants.UPDATE_ORG_PROFILE,params).success(function(response){
				$modalInstance.close(true);
			}).error(function(err){
				$modalInstance.dismiss(false);
			});
		}
	};

	$scope.cancel = function() {
		$modalInstance.dismiss(false);
	};
});
