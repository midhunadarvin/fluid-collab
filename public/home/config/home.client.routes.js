angular.module('home').config(function($stateProvider,$urlRouterProvider) {

    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'home/views/home.client.view.html',
            controller: 'HomeController'
        });

});