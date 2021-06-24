/**
 * Initialization script to initialize project with respective enviroment variables and output a .env file.
 * 
 * Supported: 
 * 	EXPRESS_PORT 	- listening port of rexpress server
 * 	MONGO_USER		- MongoDB username
 * 	MONGO_PASSWORD	- MongoDB password
 * 	MONGO_DATABASE	- Database name to connect in MongoDB
 *  SESSION_SECRET  - Session secret for hashing
 *  JWT_SECRET		- JWT secret for hashing
 *  JWT_ISSUER		- JWT issuer claim 
 *  JWT_AUDIENCE	- JWT audience claim
 */
 const fs 	   	= require('fs');
 const readline = require("readline");
 const rl 		= readline.createInterface({
	 input: process.stdin,
	 output: process.stdout
 });
 
 // to get the existing .env file if any
 require('dotenv').config();

 // define all question here with the env variable name as key
 let questions = [
	{
		question: 'Express port?',
		key: 'EXPRESS_PORT'
	}, 
	{
		question: 'MongoDB username?',
		key: 'MONGO_USER'
	},
	{
		question: 'MongoDB password?',
		key: 'MONGO_PASSWORD'
	},
	{
		question: 'MongoDB database to connect?',
		key: 'MONGO_DATABASE'
	},
	{
		question: 'Session secret, if any?',
		key: 'SESSION_SECRET'
	},
	{
		question: 'JWT secret, if any?',
		key: 'JWT_SECRET'
	},
	{
		question: 'JWT issuer, if any?',
		key: 'JWT_ISSUER'
	},
	{
		question: 'JWT audience, if any?',
		key: 'JWT_AUDIENCE'
	},
 ];

 // default value which will be overrided if provide
 let answers = {
	'EXPRESS_PORT'	: process.env.EXPRESS_PORT || 3000,
	'MONGO_USER'	: process.env.MONGO_USER || 'mongoUserDefault',
	'MONGO_PASSWORD': process.env.MONGO_PASSWORD || 'mongoPasswordDefault',
	'MONGO_DATABASE': process.env.MONGO_DATABASE || '',
	'SESSION_SECRET': process.env.SESSION_SECRET || 'change_to_something_secure',
	'JWT_SECRET'	: process.env.JWT_ISSUER || 'secret',
	'JWT_ISSUER'	: process.env.JWT_SECRET || 'example.com',
	'JWT_AUDIENCE' 	: process.env.JWT_AUDIENCE || 'yoursite.net',
 }

 // async function to ask question and update answers
 async function ask(){
	try{

		for(let q of questions){
			answers[q.key] = await new Promise( resolve => {
				rl.question(`${q.question} (default: ${answers[q.key]}) `, answer => resolve(answer || answers[q.key]) )
			});;
		}
		
		let content = '';
		for(const [key,value] of Object.entries(answers)){
			content += `${key}=${value}\n`;
		}
		fs.writeFileSync('.env', content);

		rl.close();
	} catch(err) {
		console.log('Question rejected', err);
	}
	
 };

rl.on("close", function() {
	console.log("\nIt is all set! Enjoy development");	 
	process.exit(0);
});

ask(); // ask the questions