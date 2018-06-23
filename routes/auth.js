const express = require('express');
const passport = require('passport');
const route = express.Router();

route.get('/google', passport.authenticate('google', {
		scope: ['profile', 'email']
}));

route.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
		req.flash('success_msg', 'you have been registered successfully');

		res.redirect('/');
});

route.get('/verify', (res, req) => {
		if (req.user) {
				console.log(user);
		} else {
				console.log('not auth');
		}
});

route.get('/facebook', passport.authenticate('facebook', {authType: 'rerequest'}));

route.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), function (req, res) {
		// Successful authentication, redirect home.
		req.flash('success_msg', 'you have been registered successfully');
		res.redirect('/');
});

module.exports = route;
