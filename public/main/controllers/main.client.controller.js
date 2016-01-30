angular.module('main')

.controller('MainController', ['$scope','Authentication',function($scope,Authentication) {

	$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';
	
}])

.controller('loginformController', ['$scope',
								    '$state', 
								    'Users',
								    'Login',
								    'Authentication', 
						function($scope,$state,Users,Login,Authentication){

	$scope.isActive = true;
	
	$scope.login = function(req,res){
		
		Authentication.user = req.user;
		$state.go('home');
	
	};

	$scope.signup = function(newUser){

		var user = new Users(newUser);
		user.$save(function(response) {
			Authentication.user = response;
			$state.go('home');
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});

	};

}]);