angular.module('chat')
	.config(function($stateProvider,$urlRouterProvider) {

    $stateProvider
        
        .state('chat', {
            url: '/chat',
            templateUrl: 'chat/views/chat.client.view.html'
        });

});