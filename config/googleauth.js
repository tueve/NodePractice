const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const keys = require('./database');
const mongoose = require('mongoose');

const User = mongoose.model('user')

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, function (accessToken, refreshToken, profile, done) {
    const newUser = {
      username: profile.displayName,
      email: profile.emails[0].value,
      password: accessToken
    };
    User
      .findOne({email: profile.emails[0].value})
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          new User(newUser)
            .save()
            .then((user) => {
              return done(null, user);
            });
        }
      });
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User
      .findById(id, function (err, user) {
        done(err, user);
      });
  });
}