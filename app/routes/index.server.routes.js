module.exports = function(app) {
	var index = require('../controllers/index.server.controller');
	app.get('/', index.renderIndex);
	app.get('/home', index.renderHome);
};