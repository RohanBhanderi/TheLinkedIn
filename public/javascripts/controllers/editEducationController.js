'use strict';
theLinkedIn.controller("EditEducationCtrl", function($scope, $modalInstance,
		institutions, isEdit, $rootScope, $filter, DataService) {

	/** ******************** */
	if (isEdit) {
		$scope.selectedInstitution = isEdit.school;
		$scope.selectedFromMonth = isEdit.startdate.split('-')[0]; // $filter('date')(isEdit.startdate, "MMMM"); //isEdit.startdate.split('-')[0];
		$scope.selectedFromYear = isEdit.startdate.split('-')[1];  // $filter('date')(isEdit.startdate, "yyyy");   //isEdit.startdate.split('-')[1];
		$scope.selectedToMonth = isEdit.enddate.split('-')[0]; // $filter('date')(isEdit.enddate, "MMMM");      //isEdit.enddate.split('-')[0];
		$scope.selectedToYear = isEdit.enddate.split('-')[1];	//isEdit.enddate.split('-')[1];
		$scope.degree = isEdit.degree;
		$scope.deleteOption = true;
	} else {
		$scope.selectedInstitution = "";
		$scope.selectedFromMonth = null;
		$scope.selectedFromYear = null;
		$scope.selectedToMonth = null;
		$scope.selectedToYear = null;
		$scope.degree = null;
		$scope.deleteOption = false;
	}

	$scope.institutions = institutions;
	$scope.years = new Array();
	$scope.months = dataConstants.MONTH_NAMES;
	var yr = new Date().getFullYear();
	for (var i = 1950; i <= yr + 5; i++) {
		$scope.years.push(i);
	}
	/** ******************** */

	$scope.okay = function() {

		if ($scope.selectedInstitution && $scope.selectedFromMonth
				&& $scope.selectedFromYear && $scope.selectedToMonth
				&& $scope.selectedToYear && $scope.degree) {

			var school = "";
			if ($scope.selectedInstitution.name) {
				school = $scope.selectedInstitution.name;
			} else {
				school = $scope.selectedInstitution;
			}

			if (isEdit) {

				var params = {
					update : {
						userid : $rootScope.userid,
						startdate : $scope.selectedFromMonth + "-"
								+ $scope.selectedFromYear,
						enddate : $scope.selectedToMonth + "-"
								+ $scope.selectedToYear,
						school : school,
						degree : $scope.degree
					},
					old : {
						userid : $rootScope.userid,
						rangekey : isEdit.rangekey,
						startdate : isEdit.startdate,
						enddate : isEdit.enddate,
						school : isEdit.school,
						degree : isEdit.degree
					}
				};
				console.log(JSON.stringify(params));
				DataService.putData(urlConstants.UPDATE_EDUCATION, params)
						.success(function(response) {
							$modalInstance.close(true);
						}).error(function(err) {
							$modalInstance.close(false);
						});

			} else {
				var params = {
					userid : $rootScope.userid,
					startdate : $scope.selectedFromMonth + "-"
							+ $scope.selectedFromYear,
					enddate : $scope.selectedToMonth + "-" + $scope.selectedToYear,
					school : school,
					degree : $scope.degree
				}
				
				DataService.postData(urlConstants.ADD_EDUCATION, params)
						.success(function(response) {
							$modalInstance.close(true);
						}).error(function(err) {
							$modalInstance.close(false);
						});
			}
		} else {
			$scope.formError = "Form Invalid !!!";
		}
	};
	
	$scope.deleteCall = function(){
		var uri = urlConstants.DELETE_EDUCATION;
		var params = {
					userid : $rootScope.userid,
					rangekey : isEdit.rangekey,
					startdate : isEdit.startdate,
					enddate : isEdit.enddate,
					school : isEdit.school,
					degree : isEdit.degree
				}
		console.log(JSON.stringify(params));
		DataService.deleteData(uri,params).success(function(response){
			$modalInstance.close(true);
		}).error(function(err){
			$modalInstance.close(false);
		});
	}

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

});
