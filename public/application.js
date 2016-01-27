
var mainApplicationModuleName = 'FluidCollab';

// We will add the any dependencies to the application
var mainApplicationModule = angular.module(mainApplicationModuleName, [ 'ui.router', 
																		'ngMdIcons',
																		'ngMaterial',
																		'main',
																		'users',
																		'projects',
																		'home'
																	]);

mainApplicationModule.config(['$locationProvider',function($locationProvider) {
		$locationProvider.hashPrefix('!');
}]);

mainApplicationModule.config(function($mdThemingProvider) {
	    $mdThemingProvider.theme('default')
		    .primaryPalette('blue')
		    .accentPalette('orange')
		    .backgroundPalette('light-blue');
});

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);		// Manually bootstrapping the angular app
});