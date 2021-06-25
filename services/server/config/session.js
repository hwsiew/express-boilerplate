const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const session_secret = process.env.SESSION_SECRET || 'change_to_something_secure';

module.exports = function(app){

	app.use(session({
		secret: session_secret,
		resave: false, //don't save session if unmodified
		saveUninitialized: false, // don't create session until something stored
		store: MongoStore.create({
			client: mongoose.connection.getClient()
		}) 			
	}));

}