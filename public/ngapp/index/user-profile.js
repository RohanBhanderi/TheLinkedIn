var profileController = app.controller('profileController',function($scope,$http,$filter,flash){
	$scope.saveUserDtls = function(){
        
		$http({
            method: 'POST',
            url: '/userdtls',
            data:{userid:document.getElementById('userid').value,
            	city:$scope.city,
            	phone:$scope.phone,
                summary:$scope.summary
            }
         })
         .success(function(response){
        	 console.log(response);
             flash.success = response.message;
        })
        .error(function(error){
            console.log("error", error);
            flash.error = response.message;
        });
	};
	
	$scope.saveEduDtls = function(){
		console.log($scope.from);
		console.log($scope.to);
		$http({
            method: 'POST',
            url: '/edudtls',
            
            data:{userid:document.getElementById('userid').value,
            	from:$scope.from,
            	to:$scope.to,
            	college:$scope.college,
            	degree:$scope.degree,
            }
         }).success(function(response){
             console.log(response);
             flash.success = response.message;
        }).error(function(error){
            console.log("error", error);
            flash.error = response.message;
        });
	};
	
	$scope.saveExpDtls = function(){
		$http({
            method: 'POST',
            url: '/expdtls',
            data:{userid:document.getElementById('userid').value,
            	from:$scope.frome,
            	to:$scope.toe,
            	place:$scope.place,
            	role:$scope.role,
            }
         }).success(function(response){
             console.log(response);
             flash.success = response.message;
        }).error(function(error){
            console.log("error", error);
            flash.error = response.message;
        });
	};
	
	$scope.saveSkills = function(){
		$http({
            method: 'POST',
            url: '/skills',
            data:{userid:document.getElementById('userid').value,
            	skills:$scope.skills
            }
         }).success(function(response){
             console.log(response);
             flash.success = response.message;
        }).error(function(error){
            console.log("error", error);
            flash.error = response.message;
        });
	};
	
	$scope.getUserDtls = function(){
		$http({
            method: 'GET',
            url: '/userdtls/'+document.getElementById('userid').value
         })
         .success(function(response){
        	 console.log(response);
        	 $scope.city = response.city;
        	 $scope.phone = response.phone;
             $scope.summary=response.summary;
        })
        .error(function(error){
            console.log("error");
        });
	};
	
	$scope.getEduDtls = function(){
		$http({
            method: 'GET',
            url: '/edudtls/'+document.getElementById('userid').value
         }).success(function(response){
        	 console.log(response);
        	 $scope.from=($filter('date')(response.from, 'yyyy-MM-dd'));
        	 $scope.to=($filter('date')(response.to, 'yyyy-MM-dd'));
        	 $scope.college=response.college;
        	 $scope.degree=response.degree;
        }).error(function(error){
            console.log("error");
        });
	};
	
	$scope.getExpDtls = function(){
		$http({
            method: 'GET',
            url: '/expdtls/'+document.getElementById('userid').value
         }).success(function(response){
        	 console.log(response);
        	 $scope.frome=($filter('date')(response.from, 'yyyy-MM-dd'));
        	 $scope.toe=($filter('date')(response.to, 'yyyy-MM-dd'));
        	 $scope.place=response.place;
        	 $scope.role=response.role;
        }).error(function(error){
            console.log("error");
        });
	};
	
	$scope.getSkills = function(){
		$http({
            method: 'GET',
            url: '/skills/'+document.getElementById('userid').value
         }).success(function(response){
        	 console.log(response);
        	 $scope.skills = response.skills;
        }).error(function(error){
            console.log("error");
        });
	};

	// in controller
	$scope.init = function () {
	    $scope.getUserDtls();
	    $scope.getEduDtls();
	    $scope.getExpDtls();
	};
});
profileController.$inject = ['flash'];