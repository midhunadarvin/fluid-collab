var User = require('mongoose').model('User');

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({ message: 'User is not logged in' });
	}
	next();
};

exports.create = function(req, res, next) {

	var user = new User(req.body);

	user.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});
};

exports.list = function(req, res, next) {

	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

exports.read = function(req, res) {

	res.json(req.user);

};

exports.userByID = function(req, res, next, id) {

	User.findOne({_id: id }, function(err, user) {
		if (err) {
			return next(err);
		} else {
			req.user = user;
			next();
		}
	});

};

exports.update = function(req, res, next) {

	User.findByIdAndUpdate(req.user._id, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});

};

exports.delete = function(req, res, next) {

	req.user.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.user);
		}
	});
	
};


/* Function to display errors from mongodb */

var getErrorMessage = function(err) {
		var message = '';
		if (err.code) {
			switch (err.code) {
				case 11000:
				case 11001:
					message = 'Username already exists';
					break;
				default:
					message = 'Something went wrong';
			}
		} else {
			for (var errName in err.errors) {
				if (err.errors[errName].message) 
					message = err.errors[errName].message;
			}
		}
		return message;
};

/* Functions to Render views */ 

exports.renderSignin = function(req, res, next) {
	if (!req.user) {
		res.render('signin', { title: 'Sign-in Form', messages: req.flash('error') || req.flash('info')	});
	} else {
		return res.redirect('/');
	}
};

exports.renderSignup = function(req, res, next) {
	if (!req.user) {
		res.render('signup', { title: 'Sign-up Form', messages: req.flash('error')});
	} else {
		return res.redirect('/');
	}
};

exports.signup = function(req, res, next) {						// To register a user
	if (!req.user) {											// If request doesn't have user object
		var user = new User(req.body);							// Creates a User model with req body
		var message = null;
		user.provider = 'local';								// Sets provider property of user to local
		user.save(function(err) {								// Saves the user model in database
			if (err) {
				var message = getErrorMessage(err);				// Create error message
				req.flash('error', message);
				return res.redirect('/signup');
			}

			req.login(user, function(err) {						// Login method of Passport module
				if (err) 
					return next(err);
				return res.redirect('/');

			});
		});
	} else {
		return res.redirect('/');
	}
};

exports.saveOAuthUserProfile = function(req, profile, done) {
	User.findOne({ provider: profile.provider, providerId: profile.providerId }, function(err, user) {
		if (err) {
			return done(err);
		} else {
			if (!user) {
				var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
				User.findUniqueUsername(possibleUsername, null,	function(availableUsername) {
					profile.username = availableUsername;
					console.log("Profile username set :"+profile.username);
					user = new User(profile);
					user.save(function(err) {
						if (err) {
							 var message = getErrorMessage(err);
							 console.log(message);
              				 req.flash('error', message);
             				 return req.res.redirect('/#!/index/signin'); //notice the use of req.res
						}
						return done(err, user);
					});
				});
			} else {
				return done(err, user);
			}
		}
	});
};

exports.signout = function(req, res) {
	req.logout();												// Logout Method of Passport module
	res.redirect('/');
};