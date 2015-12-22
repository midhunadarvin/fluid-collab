
var mainApplicationModuleName = 'FluidCollab';

// We will add the any dependencies to the application
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ui.router','main','users']);

mainApplicationModule.config(['$locationProvider',function($locationProvider) {
		$locationProvider.hashPrefix('!');
}]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);		// Manually bootstrapping the angular app
});