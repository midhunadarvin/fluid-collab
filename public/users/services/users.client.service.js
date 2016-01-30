angular.module('users')

.factory('Users', ['$resource',
	function($resource) {
		return $resource('api/users/:userId', { userId: '@_id' }, { update: { method: 'PUT' } });
}])

.factory('Login', ['$resource',
	function($resource) {
		return $resource('api/login');
}]);