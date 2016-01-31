angular.module('main')

.controller('MainController', ['$scope','Authentication',function($scope,Authentication) {

	$scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Application';
	
}])

.controller('loginformController', ['$scope',
								    '$state', 
								    'Users',
								    'Authentication', 
						function($scope,$state,Users,Authentication){

	$scope.isActive = true;
	
	$scope.login = function(oldUser){

		var user = new Users.login(oldUser);
		
		user.$save(function(response) {
			if(response.user){
				Authentication.user = response.user;
				Authentication.token = response.token;
				$state.go('home');
			}
			
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
	};

	$scope.signup = function(newUser){

		var user = new Users.signup(newUser);

		user.$save(function(response) {
			if(response.user){
				Authentication.user = response.user;
				Authentication.token = response.token;
				$state.go('home');
			}
			
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});

	};

}]);