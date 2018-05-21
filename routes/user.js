const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/User');
const User = mongoose.model('user');

router.get('/login', (req, res) => {
  res.send('login');
})

router.post('/register', (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.passwrod
  }

  new User(newUser)
    .save()
    .then(user => res.redirect('/'))
})

module.exports = router;