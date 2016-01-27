angular.module('projects')

.factory('Projects', ['$resource',
	function($resource) {
		return $resource('api/projects/:projectId', { projectId: '@_id' }, { update: { method: 'PUT' } });
}]);