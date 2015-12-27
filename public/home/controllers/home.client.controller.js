angular.module('home')

.controller('HomeController', ['$scope','Authentication',function($scope,Authentication) {

	$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';
	
}]);