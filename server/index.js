const path = require("path");
const express = require('express');
const routes = require('./routes');
const passport = require('passport');

const EXPRESS_PORT = process.env.PORT || 3000;

const app 	= express();

app.use(express.json());		// to support json-encoded body, e.g. {"name":"foo", "age": 23}
app.use(express.urlencoded()); 	// to support URL-encoded body, e.g. name=foo&age=

require('./config/passport');
require('./config/database')(app);
require('./config/session')(app); // this must go before passport.session() and after database had been initialize

app.use(passport.initialize());
app.use(passport.session());

// Static assect route to public folder
app.use('/static', express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => {
	res.send('Hello World! <a href="/auth/login"> Login </a>');
});

app.use('/auth', routes.auth);
app.use('/dashboard', routes.dashboard);
app.use('/api/v1', routes.api);

// start listening at designated port when db is ready
app.on('ready', () => {
	app.listen(EXPRESS_PORT, () => console.info(`[express] listening on port ${EXPRESS_PORT}`));
});