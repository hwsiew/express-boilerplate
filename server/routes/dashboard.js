const express = require('express');

const router = express.Router();

router.route('/')
	.get((req,res) => {
	
		if(req.isAuthenticated()){
			res.send('Welcome, User! <a href="/auth/logout"> Logout </a>');
		} else {
			res.redirect('/auth/login');
		}

	});

module.exports = router;