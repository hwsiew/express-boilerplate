/**
 * Initialization script to initialize project with respective enviroment variables and output a .env file.
 * 
 * Supported: 
 * 	EXPRESS_PORT 	- listening port of rexpress server
 * 	MONGO_USER		- MongoDB username
 * 	MONGO_PASSWORD	- MongoDB password
 * 	MONGO_DATABASE	- Database name to connect in MongoDB
 */
 const fs 	   	= require('fs');
 const readline = require("readline");
 const rl 		= readline.createInterface({
	 input: process.stdin,
	 output: process.stdout
 });
 
 // to get the existing .env file if any
 require('dotenv').config();
 
 // this will set default to exisiting value if .env file exist
 let default_express_port = process.env.EXPRESS_PORT || 3000,
	 default_mongodb_user = process.env.MONGO_USER || 'mongoUserDefault',
	 default_mongodb_password = process.env.MONGO_PASSWORD || 'mongoPasswordDefault',
	 default_mongodb_database = process.env.MONGO_DATABASE || ''
	 default_session_secret = process.env.SESSION_SECRET || 'change_to_something_secure';
 
 rl.question(`Express port? (default: ${default_express_port})`, express_port => {
	rl.question(`MongoDB username? (default: ${default_mongodb_user})`, mongo_user => {
		rl.question(`MongoDB password? (default: ${default_mongodb_password})`, mongo_password => {
			rl.question(`MongoDB name of database to connect? (default: ${default_mongodb_database})`, mongo_database => {
				rl.question(`Session secret, if any? (default: ${default_session_secret})`, session_secret => {

					express_port = express_port || default_express_port;
					mongo_user   = mongo_user   || default_mongodb_user;
					mongo_password = mongo_password || default_mongodb_password;
					mongo_database = mongo_database || default_mongodb_database;
					session_secret = session_secret || default_session_secret;
	
					let content = `EXPRESS_PORT=${express_port}\n`;
					content += `MONGO_USER=${mongo_user}\n`;
					content += `MONGO_PASSWORD=${mongo_password}\n`;
					content += `MONGO_DATABASE=${mongo_database}\n`;
					content += `SESSION_SECRET=${session_secret}`;
	
					fs.writeFileSync('.env', content);
	
					rl.close();

				});
			 });
		 });
	 });
 });
 
 rl.on("close", function() {
	 console.log("\nIt is all set! Enjoy development");
	 process.exit(0);
 });