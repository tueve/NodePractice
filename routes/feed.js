const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Feed = mongoose.model('feed');

router.get('/:id', async(req, res) => {
  const feed = await Feed.find({_id: req.params.id})
  res.render('board/feed-detail', {feed: feed[0]})
})

module.exports = router;