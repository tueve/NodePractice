module.exports = {
	checkAuthorized: function(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			req.flash('error_msg', 'you need to login');
			res.redirect('/');
		}
	}
};
