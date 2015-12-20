
angular.module('example').config(function($stateProvider,$urlRouterProvider) {

	$urlRouterProvider.otherwise('/index');

    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('index', {
            url: '/index',
            templateUrl: 'example/views/example.client.view.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });

});