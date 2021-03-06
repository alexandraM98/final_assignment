const express = require("express");
const passport = require("passport");
const GitHubStrategy = require('passport-github').Strategy;
const router = express.Router();

require('dotenv').config();

router.use(passport.initialize());

passport.use(new GitHubStrategy({
    clientID: process.env.gitClientID,
    clientSecret: process.env.gitClientSecret,
    callbackURL: "https://data-vis-assig.herokuapp.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    /* User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    }); */
    cb(null, profile)
  }
));
module.exports = GitHubStrategy;


module.exports = router;