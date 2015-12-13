
// Choose the environment for your node application
process.env.NODE_ENV = process.env.NODE_ENV || 'development';	

var mongoose = require('./config/mongoose'), 
	express = require('./config/express'),
	passport = require('./config/passport');


var db = mongoose();						                // Make the mongodb connection
var app = express();										// Create the express application
var passport = passport();									// Passport configuration 

app.set('port', (process.env.PORT || 3000));

module.exports = app;			

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});							
