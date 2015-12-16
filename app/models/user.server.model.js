'use strict';

var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
		firstName: String,
		lastName: String,
		email: {
		    type: String,
		    unique: true,
		    match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 'Please enter a valid email']
        },
		username: {
			type: String,
			unique: true,
			required: 'Username is required',
			trim: true
		},
		password: {
			type: String,
			validate: [ function(password) { return password.length >= 6; }, 'Password should be longer' ],
		},
		salt: {
			type: String
		},
		provider: {
			type: String,
			required: 'Provider is required'
		},
		providerId: String,
		providerData: {},
		role: {
			type: String,
			enum: ['Admin', 'Owner', 'User']
		},
		created: {
			type: Date,
			default: Date.now
		}
});

UserSchema.virtual('fullName')									// Add virtual attribute to user schema
	.get(function() {											// Get function for 'fullName'
		return this.firstName + ' ' + this.lastName;
	})
	.set(function(fullName) {									// Set function for 'fullName'
		var splitName = fullName.split(' ');
		this.firstName = splitName[0] || '';
		this.lastName = splitName[1] || '';
	});

// This will be called before save operation to the user model

UserSchema.pre('save', function(next) {		
	if (this.password) {
		this.salt = new	Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

/* --- Static Methods --- */

UserSchema.statics.findOneByUsername = function (username,callback) {
	
	this.findOne({ username: new RegExp(username, 'i') }, callback);
};

UserSchema.statics.findUniqueUsername = function(username, suffix,callback) {

	var _this = this;
	var possibleUsername = username + (suffix || '');
	_this.findOne({ username: possibleUsername }, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

/* --- Instance Methods --- */

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000,64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('User', UserSchema);