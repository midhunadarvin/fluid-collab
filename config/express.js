
var config = require('./config'),								// Configuration
	express = require('express'),							    // Express web application framework
	morgan = require('morgan'),									// For simple logging 
	compress = require('compression'),							// For compressing responses
	bodyParser = require('body-parser'),						// Middleware to handle request data
	methodOverride = require('method-override'),				// Provides 'PUT' & 'DELETE' http verbs
	session = require('express-session'),						// For using sessions
	flash = require('connect-flash'),							// For using flashes of sessions
	passport = require('passport');								// For authentication

module.exports = function() {
	var app = express();										// Create the express application

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.set('JWTSecret', config.secret); 						// secret variable

	app.use(flash());
	app.use(passport.initialize());								// Registering passport in express application
    app.use(passport.session());

	app.set('views', './app/views');							// Define the folder for rendering views
    app.set('view engine', 'ejs');								// ejs template engine for rendering views

	require('../app/routes/index.server.routes.js')(app);		// Set routes configuration for index
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/projects.server.routes.js')(app);
    
    // Folder for serving static files comes after routes config.
    // Express would first try to look for HTTP request paths in the static files folder.
	app.use(express.static('./public'));						// Static files placed under public folder

	return app;
};
