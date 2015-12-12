
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'), 
	express = require('./config/express');


var db = mongoose();						
var app = express();										// create the express application

app.set('port', (process.env.PORT || 3000));

module.exports = app;			

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});							
