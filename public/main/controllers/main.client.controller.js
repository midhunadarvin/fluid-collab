angular.module('main')

.controller('MainController', ['$scope','Authentication',function($scope,Authentication) {

	$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';
	
}])

.controller('loginformController', ['$scope', function($scope){
	$scope.isActive = true;
}]);