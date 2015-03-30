var app = angular.module('app');

app.controller('profileController' ,function($scope,$http){
	$scope.alrt = false;
	$scope.saveUserDtls = function(){
		$http({
            method: 'POST',
            url: '/userdtls',
            data:{userid:document.getElementById('userid').value,
            	city:$scope.city,
            	phone:$scope.phone
            }
         })
         .success(function(response){
        	 console.log(response);
        	 
        	 $scope.alrt = true;
        	 //window.location = '/profile?userid=' + document.getElementById('userid').value;
            //console.log(JSON.stringify(response));
            
//            if(response.login == "Success")
//           		window.location = '/successLogin';
//            else
//            	window.location = '/failLogin';
        })
        .error(function(error){
            console.log("error");
            $scope.msgs.push({type: 'alert alert-danger alert-dismissible', message: error});
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
        	 $scope.msgs.push({type: 'alert alert-success alert-dismissible', message: 'Data saved successfully'});
        }).error(function(error){
            console.log("error");
            $scope.msgs.push({type: 'alert alert-danger alert-dismissible', message: error});
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
        	 
        }).error(function(error){
            console.log("error");
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
        	 
        }).error(function(error){
            console.log("error");
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
        	 //window.location = '/profile?userid=' + document.getElementById('userid').value;
            //console.log(JSON.stringify(response));
            
//            if(response.login == "Success")
//           		window.location = '/successLogin';
//            else
//            	window.location = '/failLogin';
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
        	 $scope.from=response.from;
        	 $scope.to=response.to;
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
        	 $scope.frome=response.from;
        	 $scope.toe=response.to;
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