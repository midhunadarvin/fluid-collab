
var users = require('../../app/controllers/users.server.controller'),
	projects = require('../../app/controllers/projects.server.controller');

module.exports = function(app) {
	app.route('/api/projects')
		.get(projects.list)
		.post(users.requiresLogin, projects.create);

	app.route('/api/projects/:projectId')
		.get(projects.read)
		.put(users.requiresLogin, projects.hasAuthorization, projects.update)
		.delete(users.requiresLogin, projects.hasAuthorization, projects.delete);

	app.param('projectId', projects.projectByID);
};