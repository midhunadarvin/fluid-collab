module.exports = {
	// Production configuration options
	db: 'mongodb://root:password@ds061464.mongolab.com:61464/fluid-collab',
	sessionSecret: 'productionSessionSecret',
	facebook: {
		clientID: '543944445782787',
		clientSecret: '4a30896f66f736fdfe070ce21aa5de22',
		callbackURL: 'http://fluid-collab.herokuapp.com/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'oCQKUccJmAvYusVHsmwUpOi6H',
		clientSecret: '4miVrwCarnDzSBmK9vVI8yX0uxUldybjs0dItYdqIyvFpxlqca',
		callbackURL: 'http://fluid-collab.herokuapp.com/oauth/twitter/callback'
	}

};