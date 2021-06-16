const mongoose = require('mongoose');
const crypto  = require('crypto');
const { Schema } = mongoose;

const UserSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		index: true,
	},
	email: {
		type: String,
		required: [true, 'User\'s email is required'],
		index: true,
	},
	hash: String,
	salt: String
}, {timestamps: true});

UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validatePassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.hash === hash;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
