module.exports = {
	// Development configuration options
    db: 'mongodb://localhost/fluid-collab',
	sessionSecret: 'developmentSessionSecret',
	facebook: {
		clientID: '543944445782787',
		clientSecret: '4a30896f66f736fdfe070ce21aa5de22',
		callbackURL: 'http://127.0.0.1:3000/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'oCQKUccJmAvYusVHsmwUpOi6H',
		clientSecret: '4miVrwCarnDzSBmK9vVI8yX0uxUldybjs0dItYdqIyvFpxlqca',
		callbackURL: 'http://127.0.0.1:3000/oauth/twitter/callback'
	}

};