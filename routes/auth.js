const express = require('express');
const passport = require('passport');
const route = express.Router();

route.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

route.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), function (req, res) {
  // Successful authentication, redirect home.
  console.log(res, 'inside callback request')
  res.redirect('/');
});

module.exports = route;