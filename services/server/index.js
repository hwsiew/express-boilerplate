const path = require("path");
const express = require('express');
const routes = require('./routes');
const passport = require('passport');
const createError = require('http-errors');

const EXPRESS_PORT = process.env.PORT || 3000;

const app 	= express();

app.use(express.json());		// to support json-encoded body, e.g. {"name":"foo", "age": 23}
app.use(express.urlencoded({ extended:true })); 	// to support URL-encoded body, e.g. name=foo&age=

require('./config/passport');
require('./config/database')(app);
require('./config/session')(app); // this must go before passport.session() and after database had been initialize

app.use(passport.initialize());
app.use(passport.session());

// Static assect route to public folder
app.use('/static', express.static(path.join(__dirname,'public')));

// Home page
app.get('/', (req, res, next) => {
	res.send('Hello World! <a href="/auth/login"> Login </a>');
});

// handle user authentication
app.use('/auth', routes.auth);
app.use('/dashboard', routes.dashboard);
// API routes which are required jwt authorization
// It is require on every request so session is disabled.
app.use('/api/v1', passport.authenticate('jwt',{session: false}), routes.api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	// when next with argument other then 'route' value is called
	// all routes other than error handling middleware will be skipped
	next(createError(404, 'Page not found!', {/* custom value can add here */})); 
});

// Error Handling
// function signature must have 4 parameters even if you don't use next.
app.use(function(err,req,res,next){
	res.status(err.status || 500);
	res.send(err.message || 'Error encountered!');
})

// start listening at designated port when db is ready
app.on('ready', () => {
	app.listen(EXPRESS_PORT, () => console.info(`[express] listening on port ${EXPRESS_PORT}`));
});