angular.module('projects')
.controller('ProjectsController', [ '$scope',
								    '$stateParams', 
									'$location', 
									'Authentication', 
									'Projects',
	function($scope, $stateParams, $location, Authentication, Projects){

		$scope.authentication = Authentication;

		$scope.create = function() {
			var project = new Projects({ title: this.title, summary: this.summary });
			project.$save(function(response) {
				$location.path('projects/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.projects = Projects.query();
		};

		$scope.findOne = function() {
			$scope.project = Projects.get({ projectId: $stateParams.projectId });
		};

		$scope.update = function() {
			$scope.project.$update(function() {
					$location.path('projects/' + $scope.project._id);
			}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
			});
		};

		$scope.delete = function(project) {
			if (project) {
				project.$remove(function() {
					for (var i in $scope.projects) {
						if ($scope.projects[i] === project) {
							$scope.projects.splice(i, 1);
						}
					}
				});
			} else {
				$scope.project.$remove(function() {
					$location.path('projects');
				});
			}
		};

}]);