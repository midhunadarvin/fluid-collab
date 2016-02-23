module.exports = {
	// Production configuration options
	db: 'mongodb://root:password@ds061464.mongolab.com:61464/fluid-collab',
	secret: 'productionsecret',							// used when we create and verify JSON Web Tokens
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
	},
	google: {
		clientID: '356704566819-n6pjekl2jlu7d6emt6a6289bh19g2uml.apps.googleusercontent.com',
		clientSecret: 'xRg0pSA1tFQyXtj7XLd6T4PQ',
		callbackURL: 'http://fluid-collab.herokuapp.com/oauth/google/callback'
	},
	cloudinary: {
		Name: 'fluid-collab',
		APIKey: '384611851427943',
		APISecret: 'SucJusJPJgd53msieYf5tW0DJiA'
	}
};