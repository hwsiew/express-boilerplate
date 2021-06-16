const express = require('express');

const router = express.Router();

/**
 * You will need to defined your api route with api route controller
 * 
 * const controllers = require('./path/to/api/controllers');
 * 
 * all routes will be prefixed with /api/<version>/path
 * router.route('/path')
 * 	.all((req,res,next) => {
 * 		//thik of it as route specific middleware
 * 		// for example authentication for all api routes
 * 		next();
 * 	 })
 * 	.get(controller.get)
 *  .post(controller.create)
 * 	.put(controller.update)
 * 	.delete(contorller.delete)
 */

module.exports = router;