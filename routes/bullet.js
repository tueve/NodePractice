const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { checkAuthorized } = require('../utils');

require('../models/Story');
const Story = mongoose.model('story');

router.get('/', (req, res) => {
	Story.find({ status: 'Public' })
		.populate('user')
		.then((stories) => {
			console.log(stories);
			res.render('board', { stories });
		});
});

module.exports = router;
