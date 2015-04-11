'use strict';
theLinkedIn.controller("SignUpController", function($scope,$rootScope, $location,$window,
		DataService) {
	$scope.signUpFormError = "";
	$scope.usertype = "usr";
	$scope.signUp = function() {

		if($scope.usertype == "usr") {
			if ($scope.signUpForm.firstName.$invalid
				|| $scope.signUpForm.lastName.$invalid
				|| $scope.signUpForm.email.$invalid
				|| $scope.signUpForm.pwd.$invalid) {
				$scope.signUpFormError = "Form invalid. Please fill it again.";
				return;
			} 

		} else {
			if ($scope.signUpForm.orgname.$invalid
				|| $scope.signUpForm.email.$invalid
				|| $scope.signUpForm.pwd.$invalid) {
				$scope.signUpFormError = "Form invalid. Please fill it again.";
				return;
			} 
		}
		
			$scope.signInFormError = "";
			var params = {
				firstName : $scope.firstName,
				lastName : $scope.lastName,
				usertype : $scope.usertype,
				orgname : $scope.orgname,
				email : $scope.email,
				password : $scope.pwd
			}
			console.log(JSON.stringify(params));
			DataService.postData(urlConstants.SIGNUP, params).success(
					function(response) {
						$window.sessionStorage.userid = response.userid;
						$window.sessionStorage.email = response.email;
						$window.sessionStorage.userName = response.name;
						$window.sessionStorage.usertype = response.usertype;
						$window.sessionStorage.userLastLogin = response.lastLogin;
						$rootScope.userid = response.userid;
						$rootScope.usertype = response.usertype;
						$rootScope.email = response.email;
						$rootScope.userName = response.name;
						$rootScope.userLastLogin = response.lastLogin;
						if($rootScope.usertype == 'usr'){
							$location.path('/home');
						} else {
							$location.path('/organisation');
						}
					}).error(function(err) {
						console.log(err);
						$scope.signUpFormError = err.message;
					});
		
	}
});