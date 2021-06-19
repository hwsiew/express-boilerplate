const passport = require('passport');
const { User } = require('../../models');
const localStrategy = require('./strategies/localStrategy');

passport.use(localStrategy);

passport.serializeUser(function(user, done) {
	done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});