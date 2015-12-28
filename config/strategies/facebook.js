var passport = require('passport'),
	url = require('url'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function() {
	
	passport.use(new FacebookStrategy({
			clientID: config.facebook.clientID,
			clientSecret: config.facebook.clientSecret,
			callbackURL: config.facebook.callbackURL,
			profileFields: ['id', 'name', 'displayName','email'],
			passReqToCallback: true
		},
		function(req, accessToken, refreshToken, profile, done) {
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;
			console.log("Facebook received data :" + JSON.stringify(profile));
			var providerUserProfile = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				fullName: profile.displayName,
				username: profile.username,
				email: profile.emails[0].value,
				provider: 'facebook',
				providerId: profile.id,
				providerData: providerData
			};
		    users.saveOAuthUserProfile(req, providerUserProfile, done);
	}));
};