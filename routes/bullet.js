const express = require('express');
const router = express.Router();
const request = require('superagent');
const mongoose = require('mongoose');
const {differenceBy, uniq} = require('lodash');
let Parser = require('rss-parser');
const {checkAuthorized} = require('../utils');
const Q = require('q');
mongoose.Promise = require('q').Promise;

require('../models/Feed');
const Feed = mongoose.model('feed');

router.get('/', async(req, res) => {
  var parser = new Parser();
  try {
    const rawFeeds = await parser.parseURL('https://alligator.io//feed.xml')
    const Feeds = rawFeeds
      .items
      .map((item) => {
        const {
          content = '',
          contentSnipet = '',
          guild = '',
          isoDate = '',
          link = '',
          pubDate = '',
          title = ''
        } = item;
        var category = link.split('/')[3];
        return {
          content,
          contentSnipet,
          guild,
          isoDate,
          link,
          pubDate,
          title,
          category
        };
      });
    const currFeeds = await Feed.find({});
    const newFeeds = differenceBy(Feeds, currFeeds, 'title');
    const storeFeed = [
      ...currFeeds,
      ...newFeeds
    ];
    const result = await Q.all(newFeeds.map((item) => new Feed(item).save()));
  } catch (error) {
    const result = true;
  }
  const finalRes = await Feed.find({});
  const categories = uniq(finalRes.map((item) => item.category)).map((item) => ({category: item}));

  res.render('board', {
    feeds: finalRes,
    categories
  });
});

module.exports = router;
