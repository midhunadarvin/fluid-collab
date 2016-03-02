var config = require('./config'),
	cookieParser = require('cookie-parser'),
	passport = require('passport');

module.exports = function(server, io, mongoStore) {

	// intercept the handshake process.
	io.use(function(socket, next) {		
		// use cookieParser to parse the handshake request cookie and retrieve the Express sessionId .						
		cookieParser(config.sessionSecret)(socket.request, {},
			function(err) {
				var sessionId = socket.request.signedCookies['connect.sid'];
				// use the connect-mongo instance to retrieve the session information from the MongoDB storage.
				mongoStore.get(sessionId, function(err, session) {
					socket.request.session = session;
					// Populate the session's user object according to session information
					passport.initialize()(socket.request, {}, function() {
						passport.session()(socket.request, {}, function() {
							// Only authorized users will be able to open socket communication with server
							if (socket.request.user) {
								next(null, true);
							} else {
								next(new Error('User is not authenticated'), false);
							}
						})
					});
				});
		});
	});

	io.on('connection', function(socket) {
	/* ... */
	});
};