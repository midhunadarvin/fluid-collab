angular.module('users').factory('Authentication', [ function() {
		this.user = window.user;
		this.token = null;
		return {
			user: this.user,
			token: this.token
		};
	}
]);