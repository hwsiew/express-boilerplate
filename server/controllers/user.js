const { User } = require('../models/index');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'secret';
const jwtIssuer = process.env.JWT_ISSUER || 'example.com';
const jwtAudience = process.env.JWT_AUDIENCE || 'yoursite.net';

/**
 * Route handler to create an user
 * @param {Request} req 
 * @param {Response} res 
 */
const create = function(req, res){

	let username = req.body.username;
	let email = req.body.email;

	User.find({ $or: [ {username} , {email} ] }, function(err, users){

		if(err){
			res.send(err);
			console.log(err);
			return
		}

		if(users.length !== 0) {
			res.send('User already exist!');
			return;
		}
		
		let newUser = new User({
			username,
			email,
		});

		newUser.setPassword(req.body.password);

		newUser.save((err,_user)=>{
			if (err) return console.error(err);
			console.log(_user.username);
			res.send('Plese check your email to verify your account.');
		});
	});

};

/**
 * Route handler to verify user authentication 
 * @param {Request} req 
 * @param {Response} res 
 */
const verify = function(req, res){

	const { username, password } = req.body;

	User.findOne({ username })
		.then(user => {

			if(!user || !user.validatePassword(password)) 
				throw 'Incorrect username or password!';	

			let jwtToken = jwt.sign({
				iss: jwtIssuer,
				aud: jwtAudience,
				sub: user._id,
				exp: Math.floor(Date.now() / 1000) + (60 * 60),
			}, jwtSecret);

			res.json({ success: true, token: jwtToken });

		})
		.catch(err => {console.log(err);res.status('401').json({error: err})});

}

module.exports = {
	create,
	verify
}