const mongoose = require('mongoose');

const MONGO_USER = process.env.MONGO_USER || 'root';
const MONGO_PSWD = process.env.MONGO_PASSWORD || 'root';
const MONGO_HOST = process.env.MONGO_HOST || 'mongodb';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB	 = process.env.MONGO_DATABASE || 'test';

async function connectDatabase(app){
	try{

		const mongooseUri = `mongodb://${MONGO_USER}:${MONGO_PSWD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
		let connection 	=  await mongoose.connect( 
									mongooseUri, 
									{
										useNewUrlParser: true, 
										useUnifiedTopology: true
									}
							);
		
		console.log('[mongodb] is ready!');
		app.emit('ready');
	} catch (err){
		console.log('[mongodb] failed to connect database');

	}
	
}

module.exports = connectDatabase;