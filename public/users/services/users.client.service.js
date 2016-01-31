angular.module('users')

.factory('Users', ['$resource',function($resource) {

	var Users = {};
	Users.users = $resource('api/users/:userId', { userId: '@_id' }, { update: { method: 'PUT' } });
	Users.signup = $resource('api/signup');
	Users.login = $resource('api/login');

	return Users;
}]);
