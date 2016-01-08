angular.module('home')

.directive('toolbar', function() {
	var toolbar = {};
	toolbar.restrict = 'E'; /* restrict this directive to elements */
    toolbar.templateUrl = "/home/views/home.client.toolbar.html";
    toolbar.controller = 'HomeController';
    return toolbar;
});