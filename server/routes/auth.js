const express = require('express');
const passport = require('passport');
const { userController } = require('../controllers');

const router = express.Router();

router.route('/login')
	.get((req, res) => {

		if(req.isAuthenticated()) return res.redirect('/dashboard');
		
		res.send(
			`
			<h1>login</h1>
			<form action="/auth/login" method="post">
				<div>
					<label>Username:</label>
					<input type="text" name="username"/>
				</div>
				<div>
					<label>Password:</label>
					<input type="password" name="password"/>
				</div>
				<div>
					<input type="submit" value="Log In"/>
				</div>
			</form>
			<p> No account yet? <a href="/auth/register"> Register </a></p>
			`
		);
	})
	.post(passport.authenticate('local', { 
		successRedirect: '/dashboard',
		failureRedirect: '/auth/login?message=failed&type=error',
	}));

/**
 * /auth/verify:
 * 	post:
 * 		summary: verify user with username and password
 * 		description: verification of user with username and password and return jwt token if success
 * 		requestBody:
 * 			required: true
 * 			content: 
 * 				application/json:
 * 					schema:
 * 						type: object
 * 						properties:
 * 							username:
 * 								type: string
 * 							password:
 * 								type: string
 * 		responses:
 * 			200:
 * 				description: authentication success
 * 				content:
 * 					application/json:
 * 						scheme:
 * 							type: object
 * 							properties:
 * 								success:
 * 									type: boolean
 * 								token:
 * 									type: string
 *			401:
 * 				description: authentication fail
 *				content:
 *					application/json:
 * 						scheme:
 * 							type: object
 * 							properties:
 * 								success:
 * 									type: boolean
 * 								error:
 * 									type: string
 */
router.route('/verify')
	.post(userController.verify);

router.route('/register')
	.get((req,res) => {
		res.send(
			`
			<h1>Register</h1>
			<form action="/auth/register" method="post">
				<div>
					<label>Username:</label>
					<input type="text" name="username"/>
				</div>
				<div>
					<label>Email:</label>
					<input type="text" name="email"/>
				</div>
				<div>
					<label>Password:</label>
					<input type="password" name="password"/>
				</div>
				<div>
					<input type="submit" value="Register"/>
				</div>
			</form>
			`
		);
	})
	.post(userController.create);

router.route('/logout')
	.get((req,res) => {
		req.logout();
		res.redirect('/');
	})

module.exports = router;