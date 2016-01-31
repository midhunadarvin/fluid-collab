var User = require('mongoose').model('User');			// User model
var jwt  = require('jsonwebtoken'); 					// used to create, sign, and verify tokens
var config = require('../../config/config.js');			// Configuration options

// All requests with userId route param will pass through this middleware
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

// To register a user using local strategy
exports.signup = function(req, res, next) {						
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
			// Login the registered user.
			req.login(user, function(err) {						// Login method of Passport module
				
				if (err) 
					return res.json(err);
				
				// create a token
			    var token = jwt.sign(user, config.secret, {
			          expiresIn: 86400 // expires in 24 hours
			    });

				return res.json({
		    				success:true,
		    				token: token,
		    				user: {
								id: user._id, 
								firstName:user.firstName,
								lastName:user.lastName,
								username:user.username,
								email:user.email
							}
    			});

			});
		});
	} else {
		return res.redirect('/');
	}
};

exports.login = function(req, res) {						// To login a user
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    var user = req.user;

    // create a token
    var token = jwt.sign(user, config.secret , {
          expiresIn: 86400 // expires in 24 hours
    });

    res.json({
    			success:true,
    			token: token,
    			user: {
					id: user._id, 
					firstName:user.firstName,
					lastName:user.lastName,
					username:user.username,
					email:user.email
				}
    });
    //res.redirect('/users/' + req.user.username);

};

// To authenticate requests by verifying authtoken
exports.authenticate = function(req,res,next){
	// check header or url parameters or post parameters for token
 	 var token = req.body.token || req.query.token || req.headers['x-access-token'];

 	// Decode token
  	if (token) {
	    // verifies secret and checks exp
	    jwt.verify(token, config.secret, function(err, decoded) {      
		    if (err) {
		    	return res.json({ success: false, message: 'Failed to authenticate token.' });    
		    } else {
		        // if everything is good, save to request for use in other routes
		        req.decoded = decoded;    
		        next();
		    }
    	});

  	} else {
	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
  	}
}

// Check if user is logged in .
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({ message: 'User is not logged in' });
	}
	next();
};

// List all the users
exports.list = function(req, res, next) {

	User.find({}, function(err, users) {
		if (err) {
			return next(err);
		} else {
			res.json(users);
		}
	});
};

// Read info of one user
exports.read = function(req, res) {

	res.json(req.user);

};

// Read info of one user
exports.update = function(req, res, next) {

	User.findByIdAndUpdate(req.user._id, req.body, function(err, user) {
		if (err) {
			return next(err);
		} else {
			res.json(user);
		}
	});

};

// Delete user
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

// Register user using other strategies.
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

// Log out user
exports.signout = function(req, res) {
	req.logout();												// Logout Method of Passport module
	res.redirect('/');
};