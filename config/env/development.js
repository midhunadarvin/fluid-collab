module.exports = {
	// Development configuration options
    db: 'mongodb://localhost/fluid-collab',			// MongoDB url
    secret: 'developmentsecret',					// used when we create and verify JSON Web Tokens
	sessionSecret: 'developmentSessionSecret',		
	facebook: {
		clientID: '543944445782787',
		clientSecret: '4a30896f66f736fdfe070ce21aa5de22',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'oCQKUccJmAvYusVHsmwUpOi6H',
		clientSecret: '4miVrwCarnDzSBmK9vVI8yX0uxUldybjs0dItYdqIyvFpxlqca',
		callbackURL: 'http://127.0.0.1:3000/oauth/twitter/callback'
		
	},
	google: {
		clientID: '356704566819-n6pjekl2jlu7d6emt6a6289bh19g2uml.apps.googleusercontent.com',
		clientSecret: 'xRg0pSA1tFQyXtj7XLd6T4PQ',
		callbackURL: 'http://127.0.0.1:3000/oauth/google/callback'
	},
	cloudinary: {
		Name: 'fluid-collab',
		APIKey: '384611851427943',
		APISecret: 'SucJusJPJgd53msieYf5tW0DJiA'
	}

};