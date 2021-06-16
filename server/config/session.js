const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

module.exports = function(app){

	app.use(session({
		secret: 'keyboard cat',
		resave: false, //don't save session if unmodified
		saveUninitialized: false, // don't create session until something stored
		store: MongoStore.create({
			client: mongoose.connection.getClient()
		}) 			
	}));

}