'use strict';
theLinkedIn.controller("EditEmploymentCtrl", function($scope, $modalInstance,
		companies, isEdit, $rootScope, $filter, DataService) {

	/***********************/
	if (isEdit) {
		$scope.selectedCompany = isEdit.companyname;
		$scope.selectedFromMonth = isEdit.startdate.split('-')[0]; // $filter('date')(isEdit.startdate, "MMMM"); //isEdit.startdate.split('-')[0];
		$scope.selectedFromYear = isEdit.startdate.split('-')[1];  // $filter('date')(isEdit.startdate, "yyyy");   //isEdit.startdate.split('-')[1];
		$scope.selectedToMonth = isEdit.enddate.split('-')[0]; // $filter('date')(isEdit.enddate, "MMMM");      //isEdit.enddate.split('-')[0];
		$scope.selectedToYear = isEdit.enddate.split('-')[1]; //$filter('date')(isEdit.enddate, "yyyy");
		$scope.designation = isEdit.title;
		$scope.deleteOption = true;
	} else {
		$scope.selectedCompany = "";
		$scope.selectedFromMonth = null;
		$scope.selectedFromYear = null;
		$scope.selectedToMonth = null;
		$scope.selectedToYear = null;
		$scope.designation = null;
		$scope.deleteOption = false;
	}

	$scope.companies = companies;
	$scope.years = new Array();
	$scope.months = dataConstants.MONTH_NAMES;
	var yr = new Date().getFullYear();
	for (var i = 1950; i <= yr; i++) {
		$scope.years.push(i);
	}
	/** ******************** */

	$scope.ok = function() {
		if ($scope.selectedCompany && $scope.selectedFromMonth
				&& $scope.selectedFromYear && $scope.selectedToMonth
				&& $scope.selectedToYear && $scope.designation) {
			
			var company = "";
			if ($scope.selectedCompany.name) {
				company = $scope.selectedCompany.name;
			} else {
				company = $scope.selectedCompany;
			}

			if (isEdit) {

				var params = {
					update : {
						userid : $rootScope.userid,
						startdate : $scope.selectedFromMonth + "-"
								+ $scope.selectedFromYear,
						enddate : $scope.selectedToMonth + "-"
								+ $scope.selectedToYear,
						companyname : company,
						title : $scope.designation
					},
					old : {
						userid : $rootScope.userid,
						rangekey : isEdit.rangekey,
						startdate : isEdit.from,
						enddate : isEdit.to,
						companyname : isEdit.companyname,
						title : isEdit.title
					}
				};

				DataService.putData(urlConstants.UPDATE_EXPERIENCE, params)
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
					companyname : company,
					title : $scope.designation
				};
				DataService.postData(urlConstants.ADD_EXPERIENCE, params)
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
		var uri = urlConstants.DELETE_EMPLOYMENT;
		var params = {
					userid : $rootScope.userid,
					rangekey : isEdit.rangekey,
					startdate : isEdit.startdate,
					enddate : isEdit.enddate,
					companyname : isEdit.companyname,
					title : isEdit.title
				};
		
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
