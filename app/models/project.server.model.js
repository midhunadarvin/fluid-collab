'use strict';

var mongoose = require('mongoose'),		// For easy management of mongodb	
	crypto = require('crypto'),			// For cryptography functions
	Schema = mongoose.Schema;			

var ProjectSchema = new Schema({
		title: {											// Project Title
			type: String,
			default: '',
			trim: true,
			required: 'Title cannot be blank'
		},
		summary: {											// Brief summary of the project
			type: String,
			default: '',
			trim: true
		},
		client: String,										// The client name 
		leader: String,										// Project Leader
		status: { 											// Current status of the project
			type: Number, 
			min: 0, 
			max: 9 
		},
		assignees: [{type: Schema.ObjectId, ref: 'User'}],	// Tech assigned 
		creator: {											// Project creator
			type: Schema.ObjectId,
			ref: 'User'
		},
		created: {											// Date created 
			type: Date,
			default: Date.now
		}
});

// This will be called before save operation to the project model

ProjectSchema.pre('save', function(next) {		
	
	next();
});

/* --- Static Methods --- */

// Method to find a project by name
ProjectSchema.statics.findOneByName = function (name,callback) {
	
	this.findOne({ name: new RegExp(username, 'i') }, callback);
};

/* --- Instance Methods --- */

ProjectSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

mongoose.model('Project', ProjectSchema);