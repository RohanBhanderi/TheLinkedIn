theLinkedIn.controller('postController',function($scope,$rootScope,$http){

$scope.home = function(){
		$http({
            method: 'GET',
            url: '/userHome/'+$rootScope.userid
         }).success(function(response){
        	console.log("success");
        	//window.location = '/home';
        	console.log();

			$scope.rows=response;
	        console.log(JSON.stringify(response));
//            
//            if(response.login == "Success")
//           		window.location = '/successLogin';
//            else
//            	window.location = '/failLogin';
        }).error(function(error){
            console.log("error");
        });
	};

$scope.submitpost=function(){
		$http({
		method: 'POST',
		url: '/userPost',
		data: {
		postbody: $scope.postbody,
		userid:$rootScope.userid
		}
	}).success(function(response){
		console.log("success");
		$scope.postbody = "";
	}).error(function(error){
	console.log("error");
	});
};
	
	$scope.getAllPosts=function(){
		$scope.home();
	};
	
	
});
