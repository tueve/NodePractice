const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const keys = require('./database');
const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = function (passport) {
		passport.use(new FacebookStrategy({
				clientID: keys.facebookClientID, clientSecret: keys.facebookClientSecret, callbackURL: 'https://node4newbie.herokuapp.com//auth/facebook/callback'
				// callbackURL: 'https://localhost:5000//auth/facebook/callback'

		}, function (accessToken, refreshToken, profile, done) {
				console.log(profile, 'profile');
				const newUser = {
						username: profile.displayName,
						email: profile.id,
						password: accessToken
				};
				User
						.findOne({email: profile.id})
						.then((user) => {
								if (user) {
										return done(null, user);
								} else {
										new User(newUser)
												.save()
												.then((user) => {
														return done(null, user);
												});
								}
						});
		}));

		passport.serializeUser(function (user, done) {
				done(null, user.id);
		});

		passport.deserializeUser(function (id, done) {
				User
						.findById(id, function (err, user) {
								done(err, user);
						});
		});
};
