const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const MONGO_USER = process.env.MONGO_USER || 'root';
const MONGO_PSWD = process.env.MONGO_PASSWORD || 'root';
const MONGO_HOST = process.env.MONGO_HOST || 'mongodb';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB	 = process.env.MONGO_DATABASE || 'test';
const EXPRESS_PORT = process.env.PORT || 3000;

const app 	= express();

app.use(express.json());		// to support json-encoded body, e.g. {"name":"foo", "age": 23}
app.use(express.urlencoded()); 	// to support URL-encoded body, e.g. name=foo&age=23

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.use('/api/v1',routes.api);

var connectMongoDB = function(){
	const mongooseUri = `mongodb://${MONGO_USER}:${MONGO_PSWD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
	mongoose
		.connect(
			mongooseUri, 
			{
				useNewUrlParser: true, 
				useUnifiedTopology: true
			}
		)
		.then(() => {
			console.log('[mongodb] is ready!');
			app.emit('ready'); // emit 'ready' event when database is connected
		})
		.catch((err) => {
			console.log(err);
			setTimeout(connectMongoDB, 5000); // retry if connection failed
		});
}
connectMongoDB(); // connect to db

// start listening at designated port when db is ready
app.on('ready', () => {
	app.listen(EXPRESS_PORT, () => console.info(`[express] listening on port ${EXPRESS_PORT}`));
});