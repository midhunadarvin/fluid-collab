
var mainApplicationModuleName = 'FluidCollab';

// We will add the any dependencies to the application
var mainApplicationModule = angular.module(mainApplicationModuleName, [ 'ui.router', 
																		'ngMdIcons',
																		'ngMaterial',
																		'ngResource',
																		'treasure-overlay-spinner',
																		'main',
																		'users',
																		'cloudinary',
																		'ngFileUpload',
																		'projects',
																		'home',
																		'chat'
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

mainApplicationModule.config(['cloudinaryProvider', function (cloudinaryProvider) {
  cloudinaryProvider
      .set("cloud_name", "fluid-collab")
      .set("upload_preset", "z6pupi4m");
}]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);		// Manually bootstrapping the angular app
});