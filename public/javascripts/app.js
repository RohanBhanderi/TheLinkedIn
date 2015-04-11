'use strict';
var theLinkedIn = angular.module("myLinkedIn", [ 'ui.router', 'ui.bootstrap' ])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider
	//.when()
	.otherwise('/');
	$stateProvider
	.state("index",{
		url: "/",
		templateUrl: "templates/login.html",
		controller : 'LoginController'
	})
	.state("login",{
		url: "/login",
		templateUrl: "templates/login.html",
		controller : 'LoginController'
	})
	.state("logout",{
		url: "/login",
		templateUrl: "templates/login.html",
		controller : 'UserHomeController'
	})
	.state("home",{
		url: "/home",
		templateUrl: "templates/home.html",
		controller : 'UserHomeController'
	})
	.state("organisation",{
		url: "/organisation",
		templateUrl: "templates/organisation.html",
		controller : 'OrgHomeController'
	});
	/**
	 * to remove hash in the URL
	 */
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	});

});
// .run(['$rootScope','$window' ,'$location', 'DataService',function($rootScope,$window, $location,DataService) {
// 	$rootScope.$on('$routeChangeStart', function(event) {

// 		DataService.postData(urlConstants.IS_LOGGED_IN,[]).success(function(response){

// 			if($window.sessionStorage.userId){
// 				$rootScope.userId = $window.sessionStorage.userId;
// 				$rootScope.userName = $window.sessionStorage.userName;
// 				$rootScope.userLastLogin = $window.sessionStorage.userLastLogin;
// 				$location.path('/home');
// 			}
// 			else{
// 				$location.path('/');
// 			}

// 		}).error(function(err){
// 			if($window.sessionStorage.userId){
// 				var params = {
// 						email : $window.sessionStorage.userId
// 				};
// 				DataService.postData(urlConstants.LOGOUT, params).success(
// 						function(response) {
// 							$location.path('/');
// 							$window.sessionStorage.userId = undefined;
// 							$window.sessionStorage.userName = undefined;
// 							$window.sessionStorage.userLastLogin = undefined;
// 						}).error(function(err) {
// 							console.log("Error while session validity");
// 						});
// 			}else{
// 				$location.path('/');
// 			}
// 		});
// 	});
// }]);