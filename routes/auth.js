const express = require('express');
const passport = require('passport');
const route = express.Router();

route.get(
	'/google',
	passport.authenticate('google', {
		scope: [ 'profile', 'email' ]
	})
);

route.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/'
	}),
	(req, res) => {
		req.flash(
			'success_msg',
			'you have been registered successfully'
		);

		res.redirect('/');
	}
);

route.get('/verify', (res, req) => {
	if (req.user) {
		console.log(user);
	} else {
		console.log('not auth');
	}
});

module.exports = route;
