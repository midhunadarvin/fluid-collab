module.exports = {
	// Production configuration options
	db: 'mongodb://root:password@ds061464.mongolab.com:61464/fluid-collab',
	sessionSecret: 'productionSessionSecret',
	facebook: {
		clientID: 'Application Id',
		clientSecret: 'Application Secret',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	}

};