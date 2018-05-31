const LoginStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = function (passport) {
  passport.use(new LoginStrategy({
    usernameField: 'username'
  }, (username, password, done) => {
    User
      .findOne({'username': username})
      .then(user => {
        if (!user) {
          return done(null, false, {message: 'Incorrect username.'});
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) 
              throw new Error(err);
            if (!isMatch) {
              return done(null, false, {message: 'Incorrect password.'});
            } else {
              return done(null, user)
            }
          });
        }
      })
      .catch(error => {
        throw new Error(error);
      })
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