const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookId: profile.id }, (err, user) => {
    if (err) return done(err);
    if (user) {
      user.tokens.facebook = accessToken;
      user.save();
      return done(null, user);
    } else {
      const newUser = new User({
        username: profile.displayName,
        facebookId: profile.id,
        tokens: { facebook: accessToken }
      });
      newUser.save(err => {
        if (err) return done(err);
        return done(null, newUser);
      });
    }
  });
}));

// Twitter

// Instagram 

// TikTok
