const passport = require('passport');
const { User } = require('../../models');
const localStrategy = require('./strategies/localStrategy');
const jwtStrategy = require('./strategies/jwtStrategy');

// local session strategy
passport.use(localStrategy);
// jwt bearer token stratety
passport.use(jwtStrategy);

passport.serializeUser(function(user, done) {
	done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});