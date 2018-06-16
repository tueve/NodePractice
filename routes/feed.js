const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Feed = mongoose.model('feed');
const User = mongoose.model('user');

router.get('/:id', async(req, res) => {
  const feed = await Feed.find({_id: req.params.id})
  let bookmark = false;
  if (req.isAuthenticated()) {
    const {bookmarks} = req.user;
    if (bookmarks.find(item => item.feedID === req.params.id)) {
      bookmark = true
    }
  }
  res.render('board/feed-detail', {
    feed: feed[0],
    bookmark
  })
})

router.post('/:id', async(req, res) => {
  const user = await User.findById({
    _id: req.body.userID
  },)
  if (!user) {
    res.status(500);
    res.send({"Error": "Looks like something wrong with your account. Please login again.", status: 500});
    console.log("BUGS.");
  } else {
    const newBookmark = user.bookmarks;
    const type = newBookmark.find(item => item.feedID === req.body.feedID)
      ? 'deselect'
      : 'bookmark'
    if (type === 'deselect') {
      user.bookmarks = user
        .bookmarks
        .filter(item => item.feedID !== req.body.feedID)
    } else {
      user.bookmarks = [
        ...user.bookmarks, {
          feedID: req.body.feedID
        }
      ]
    }
    console.log(user.bookmarks)
    const newUser = await user.save();
    res.status(200);
    res.send({status: 200, type})
  }
})

module.exports = router;