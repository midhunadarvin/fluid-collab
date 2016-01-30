var mongoose = require('mongoose');
var Project = mongoose.model('Project');


// All requests with a projectId route param will pass through this middleware
exports.projectByID = function(req, res, next, id) {

	Project.findById(id).populate('creator', 'firstName lastName fullName')
	.exec(function(err, project) {
		if (err) {
			return next(err);
		} 

		if (!project) 
			return next(new Error('Failed to load project '+ id));
		
		req.project = project;
		next();
	});
};

// Check if the current user has authorization to make changes to the project
exports.hasAuthorization = function(req, res, next) {
	if (req.project.creator.id !== req.user.id) {
		return res.status(403).send({ message: 'User is not authorized' });
	}
	next();
};

// Create a new Project 
exports.create = function(req, res) {

	var project = new Project(req.body);
	project.creator = req.user;
	project.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(project);
		}
	});
};

// List all the Projects 
exports.list = function(req, res, next) {
	
	Project.find().sort('-created').populate('creator', 'firstName lastName fullName')
	.exec(function(err, projects) {
		if (err) {
			return res.status(400).send({ message: getErrorMessage(err) });
		} else {
			res.json(projects);
		}
	});
};

// Send a project as response
exports.read = function(req, res) {
	res.json(req.project);
};

// Update the project
exports.update = function(req, res, next) {

	var project = req.project;
	project.title = req.body.title;

	project.summary = req.body.summary;

	project.save(function(err) {
		if (err) {
			return res.status(400).send({ message: getErrorMessage(err)	});
		} else {
			res.json(project);
		}
	});

};

// Delete the project
exports.delete = function(req, res, next) {
	var project = req.project;
	req.project.remove(function(err) {
		if (err) {
			return res.status(400).send({ message: getErrorMessage(err) });
		} else {
			res.json(req.project);
		}
	});	
};


/* Function to display errors from mongodb */
var getErrorMessage = function(err) {
		if (err.errors) {
			for (var errName in err.errors) {
				if (err.errors[errName].message) 
					return err.errors[errName].message;
			}
		} else {
			return 'Unknown server error';
		}
};