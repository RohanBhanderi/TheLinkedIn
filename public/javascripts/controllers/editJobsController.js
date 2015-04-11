'use strict';
theLinkedIn.controller("EditJobsCtrl", function($scope, $modalInstance,isEdit,$rootScope,DataService,$window) {

	if (isEdit) {
		$scope.title = isEdit.firstname;
		$scope.location = isEdit.lastname;
		$scope.fromdate = isEdit.created;
		$scope.todate = isEdit.modified;
		$scope.details = isEdit.details;
		$scope.deleteOption = true;
	} else {
		$scope.title = "";
		$scope.location = null;
		$scope.fromdate = null;
		$scope.todate = null;
		$scope.details = null;
		$scope.deleteOption = false;
	}
	
	$scope.today = new Date();
	
	$scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		  };
	$scope.datepickers = {
        from: false,
        to: false
    };
	$scope.open = function($event,which) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.datepickers[which] = true;
	  };
	
	
	$scope.okay = function() {
		if($scope.title === "" || $scope.location=== ""  || $scope.fromdate=== ""  || $scope.fromdate=== "--"
			|| $scope.fromdate=== ""  || $scope.fromdate=== "--"){
			$scope.formError = "Form Invalid !!!";
		}else{
			var newDate = new Date($scope.fromdate);
			var formattedFrom = newDate.getDate()+"-"+dataConstants.MONTH_NAMES[newDate.getMonth()]+"-"+newDate.getFullYear();
			
			var newDate2 = new Date($scope.todate);
			var formattedTo = newDate2.getDate()+"-"+dataConstants.MONTH_NAMES[newDate2.getMonth()]+"-"+newDate2.getFullYear();
			
			if (isEdit) {

				var params = {
						organisationid : $rootScope.userid,
						title : $scope.title,
						location : $scope.location,
						created : formattedFrom,
						modified : formattedTo,
						details : $scope.details
				};
				console.log(JSON.stringify(params));
				DataService.putData(urlConstants.UPDATE_JOB, params)
						.success(function(response) {
							$modalInstance.close(true);
						}).error(function(err) {
							$modalInstance.close(false);
						});

			} else {

				var params = {
						organisationid : $rootScope.userid,
						title : $scope.title,
						location : $scope.location,
						created : formattedFrom,
						modified : formattedTo,
						details : $scope.details
				};
				
				DataService.postData(urlConstants.POST_JOB,params).success(function(response){
					$modalInstance.close(true);
				}).error(function(err){
					$modalInstance.dismiss(false);
				});
			}
		}
	};

	$scope.deleteCall = function(){
		var params = {
					organisationid : $rootScope.userid,
						title : $scope.title,
						location : $scope.location,
						created : formattedFrom,
						modified : formattedTo,
						details : $scope.details
				}
		console.log(JSON.stringify(params));
		DataService.deleteData(urlConstants.DELETE_JOB,params).success(function(response){
			$modalInstance.close(true);
		}).error(function(err){
			$modalInstance.close(false);
		});
	}

	$scope.cancel = function() {
		$modalInstance.dismiss(false);
	};
});
