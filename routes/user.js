const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../models/User');
const User = mongoose.model('user');

router.get('/register', (req, res) => {
		res.render('register');
});

router.post('/register', (req, res) => {
		User.findOne({
				$or: [
						{
								email: req.body.email
						}, {
								username: req.body.username
						}
				]
		}).then((user) => {
				if (user) {
						res.render('register', {
								username: req.body.username,
								email: req.body.email,
								error_msg: 'Email or username has already existed'
						});
				} else {
						bcrypt
								.genSalt(10, function (err, salt) {
										bcrypt
												.hash(req.body.password, salt, function (err, hash) {
														const newUser = {
																username: req.body.username,
																email: req.body.email,
																password: hash
														};
														new User(newUser)
																.save()
																.then((user) => {
																		req.flash('success_msg', 'you have been registered successfully');
																		res.redirect('/');
																});
												});
								});
				}
		});
});
module.exports = router;
