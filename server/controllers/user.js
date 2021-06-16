const { User } = require('../models/index');

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

module.exports = {
	create,
}