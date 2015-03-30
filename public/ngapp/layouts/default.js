var app = angular.module('app');

app.controller('navController',function($scope,$http){
	$scope.showProfile = function(){
		$http({
            method: 'GET',
            url: '/profile',
            param:{userid:document.getElementById('userid').value}
         })
         .success(function(response){
        	 window.location = '/profile?userid=' + document.getElementById('userid').value;
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
	
	$scope.login = function(){
		
		$http({
            method: 'GET',
            url: '/login'
         }).success(function(response){
        	window.location = '/login';
//            console.log(JSON.stringify(response));
//            
//            if(response.login == "Success")
//           		window.location = '/successLogin';
//            else
//            	window.location = '/failLogin';
        }).error(function(error){
            console.log("error");
        });
	};
	
	$scope.logout = function(){
		$http({
            method: 'GET',
            url: '/logout'
         }).success(function(response){
        	window.location = '/login';
//            console.log(JSON.stringify(response));
//            
//            if(response.login == "Success")
//           		window.location = '/successLogin';
//            else
//            	window.location = '/failLogin';
        }).error(function(error){
            console.log("error");
        });
	};
	
	$scope.home = function(){
		$http({
            method: 'GET',
            url: '/'
         }).success(function(response){
        	console.log("success");
        	window.location = '/home';
//            console.log(JSON.stringify(response));
//            
//            if(response.login == "Success")
//           		window.location = '/successLogin';
//            else
//            	window.location = '/failLogin';
        }).error(function(error){
            console.log("error");
        });
	};
});