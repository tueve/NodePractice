const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { checkAuthorized } = require('../utils');

const Feed = mongoose.model('feed');
const User = mongoose.model('user');
router.get('/', checkAuthorized, async (req, res) => {
	const user = await User.findById({ _id: req.user._id }).populate('bookmarks.feedID');

	res.render('board/bookmark', {
		bookmarks: user.bookmarks
	});
});

router.delete('/delete/:id', checkAuthorized, async (req, res) => {
	const newUser = await User.findByIdAndUpdate(
		{ _id: req.user._id },
		{ $pull: { bookmarks: { feedID: req.params.id } } },
		{ new: true }
	);
	req.flash('delete_msg', 'bookmark has been deleted');
	res.redirect('/bookmarks');
});

module.exports = router;
