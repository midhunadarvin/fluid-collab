angular.module('projects')

.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
	
	$stateProvider
	
	 .state('projects', {
            url: '/projects',
            templateUrl: 'projects/views/list-projects.client.view.html',
            controller: 'loginformController'
        })
        .state('create-project', {  
            url: '/projects/create',
            templateUrl: 'projects/views/create-project.client.view.html'   
        })
        .state('view-project', {  
            url: '/projects/:projectId',
            templateUrl: 'projects/views/view-project.client.view.html'   
        })
        .state('edit-project', {  
            url: '/projects/:projectId/edit',
            templateUrl: 'projects/views/edit-project.client.view.html'   
        })
	}
]);