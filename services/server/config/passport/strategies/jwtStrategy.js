const { User } = require('../../../models');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || 'secret';
opts.issuer = process.env.JWT_ISSUER || 'example.com';
opts.audience = process.env.JWT_AUDIENCE || 'yoursite.net';

const verifyCallaback = function(payload,done){
	User.findById(payload.sub, function(err, user) {
        console.log(err,user)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}

const jwtStrategy = new JwtStrategy( opts, verifyCallaback );

module.exports = jwtStrategy;