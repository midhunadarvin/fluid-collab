'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
		firstName: String,
		lastName: String,
		email: {
		    type: String,
		    required: true,
		    unique: true,
		    match: [ /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 'Please enter a valid email']
        },
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true
		},
		password: {
			type: String,
			validate: [ function(password) { return password.length >= 6; }, 'Password should be longer' ]
		},
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

UserSchema.statics.findOneByUsername = function (username,callback) {		// Static method
	this.findOne({ username: new RegExp(username, 'i') }, callback);
};

UserSchema.methods.authenticate = function(password) {						// Instance method
	return this.password === password;
};

UserSchema.set('toJSON', { getters: true, virtuals: true });

mongoose.model('User', UserSchema);