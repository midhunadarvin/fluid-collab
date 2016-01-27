angular.module('pojects')
.controller('ProjectsController', [ '$scope',
								    '$routeParams', 
									'$location', 
									'Authentication', 
									'Projects',
	function($scope, $routeParams, $location, Authentication, Projects){

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
			$scope.project = Projects.get({ projectId: $routeParams.projectId });
		};

		$scope.update = function() {
			$scope.article.$update(function() {
					$location.path('projects/' + $scope.project._id);
			}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
			});
		};

		$scope.delete = function(article) {
			if (article) {
				article.$remove(function() {
					for (var i in $scope.articles) {
						if ($scope.articles[i] === article) {
							$scope.articles.splice(i, 1);
						}
					}
				});
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

}]);