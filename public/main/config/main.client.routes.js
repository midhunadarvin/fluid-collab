
angular.module('main').config(function($stateProvider,$urlRouterProvider) {

	$urlRouterProvider.otherwise('/index/signup');

    $stateProvider
        
        .state('index', {
            url: '/index',
            templateUrl: 'main/views/main.client.loginform.html',
            controller: 'loginformController as loginCtrl'
        })
        .state('index.signup', {  
            url: '/signup',
            templateUrl: 'main/views/main.loginform.signup.html'   
        })
        .state('index.signin', {  
            url: '/signin',
            templateUrl: 'main/views/main.loginform.signin.html'   
        });

});