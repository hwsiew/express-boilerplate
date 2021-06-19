const { User } = require('../../../models');
const LocalStrategy = require('passport-local').Strategy;

// this set the field name passport is looking for from the request depending on your form field name
// e.g. the following passport with looks for req.body.username as username and req.body.password as password
const customFields = {
	usernameField: 'username',
	passwordField: 'password',
};

// use this callback to verify the user 
// done(null, user) : successful authentication
// done(null, false, { message: 'message to display'}) : fail authentication
// done(err) : error occur during authentication
const verifyCallback = function(username, password, done){

	User.findOne({ username })
		.then(user => {

			if(!user || !user.validatePassword(password)) 
				return done(null, false, { message : 'Incorrect username or password.'});

			return done(null,user);

		})
		.catch(err => done(err))

};

const localStrategy = new LocalStrategy(customFields, verifyCallback);

module.exports = localStrategy;