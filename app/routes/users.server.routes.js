
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app) {
	
	app.route('/users')
		.post(users.create)
		.get(users.list);

	app.route('/users/:userId')					
		.get(users.read)
		.put(users.update)
		.delete(users.delete);
	
	app.param('userId', users.userByID);

	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', { 
			successRedirect: '/#!/home', 
			failureRedirect: '/#!/signin', 
			failureFlash: true 
		}));

	app.get('/signout', users.signout);

	app.get('/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/#!/index/signin',
		scope: [ 'email' ]
	}));
	
	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/#!/index/signin',
		successRedirect: '/#!/home'
	}));

	app.get('/oauth/twitter', passport.authenticate('twitter', {
		failureRedirect: '/#!/index/signin'
	}));

	app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
		failureRedirect: '/#!/index/signin',
		successRedirect: '/#!/home'
	}));

	app.get('/oauth/google', passport.authenticate('google', {
		failureRedirect: '/#!/index/signin',
		scope: [
		'https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email'
		],
	}));
	
	app.get('/oauth/google/callback', passport.authenticate('google', {
		failureRedirect: '/#!/index/signin',
		successRedirect: '/#!/home'
	}));
};