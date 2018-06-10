const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { checkAuthorized } = require('../utils');

require('../models/Story');
const Story = mongoose.model('story');
router.get('/:page', checkAuthorized, (req, res) => {
	var perPage = 5;
	var page = +req.params.page || 1;

	Story.find({
		user: req.user._id
	})
		.sort({ date: -1 })
		.skip(perPage * page - perPage)
		.limit(perPage)
		.exec((err, stories) => {
			Story.find({
				user: req.user._id
			})
				.count()
				.exec(function(err, count) {
					if (err) return next(err);
					res.render('stories', {
						stories: stories,
						current: page,
						pages:
							count % perPage === 0
								? count / perPage
								: Math.ceil(count / perPage)
					});
				});
		});
});

router.post('/add', checkAuthorized, (req, res) => {
	const enableCmt = req.body.enableCmt ? true : false;
	const newStory = {
		title: req.body.title,
		status: req.body.status,
		enableCmt: enableCmt,
		editor: req.body.editor,
		user: req.user._id
	};
	new Story(newStory).save().then((story) => {
		req.flash(
			'success_msg',
			'Your story has been added successfully'
		);
		res.redirect(`/story/1`);
	});
});

router.delete('/delete/:id', (req, res) => {
	Story.remove({ _id: req.params.id }).then((stories) => {
		req.flash('delete_msg', 'story has been deleted');
		res.redirect('/story/1');
	});
});

router.put('/update/:id', (req, res) => {
	Story.findOne({ _id: req.params.id }).then((story) => {
		const {
			title,
			status,
			enableCmt,
			editor
		} = req.body;
		story.title = title;
		story.status = status;
		story.enableCmt = !!enableCmt;
		story.editor = editor;
		story.date = Date.now();
		story
			.save()
			.then((stories) => res.redirect('/story/1'));
	});
});

module.exports = router;
