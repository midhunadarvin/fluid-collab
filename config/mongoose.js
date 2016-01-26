
var config = require('./config'),
	mongoose = require('mongoose');

module.exports = function() {
	var db = mongoose.connect(config.db);					// Connecting to db

	require('../app/models/user.server.model');				// Defining the user model
	require('../app/models/project.server.model');			// Defining the project model

	return db;
};