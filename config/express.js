
var config = require('./config'),								// Configuration
	http = require('http'),										// To create a server object
	socketio = require('socket.io'),							// For incorporating realtime capabilties
	express = require('express'),							    // Express web application framework
	morgan = require('morgan'),									// For simple logging 
	compress = require('compression'),							// For compressing responses
	bodyParser = require('body-parser'),						// Middleware to handle request data
	methodOverride = require('method-override'),				// Provides 'PUT' & 'DELETE' http verbs
	session = require('express-session'),						// For using sessions
	MongoStore = require('connect-mongo')(session),
	flash = require('connect-flash'),							// For using flashes of sessions
	passport = require('passport'),								// For authentication
	cloudinary = require('cloudinary');							// Image hosting service

module.exports = function(db) {
	var app = express();										// Create the express application
	var server = http.createServer(app);
	var io = socketio.listen(server);

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

	var mongoStore = new MongoStore({
		db: db.connection.db
	});

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		store: mongoStore
	}));

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.set('JWTSecret', config.secret); 						// secret variable

	cloudinary.config({ 										// Configure cloudinary
	  cloud_name: config.cloudinary.Name, 
	  api_key: config.cloudinary.APIKey, 
	  api_secret: config.cloudinary.APISecret
	});

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

	require('./socketio')(server, io, mongoStore);

	return server;
};
