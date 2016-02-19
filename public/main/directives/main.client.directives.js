angular.module('main')

.directive('socialButtons', function() {
	var socialButtons = {};
	socialButtons.restrict = 'E'; /* restrict this directive to elements */
    socialButtons.templateUrl = "/main/views/main.client.social-buttons.html";
    socialButtons.controller = 'MainController';
    return socialButtons;
});