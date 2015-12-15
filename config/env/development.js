module.exports = {
	// Development configuration options
    db: 'mongodb://localhost/fluid-collab',
	sessionSecret: 'developmentSessionSecret',
	facebook: {
		clientID: 'Application Id',
		clientSecret: 'Application Secret',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	}

};