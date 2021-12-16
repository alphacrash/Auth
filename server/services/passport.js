const passport = require("passport");
const passportJwt = require("passport-jwt");
const LocalStrategy = require("passport-local");

const User = require("../models/user");
const config = require("../config");

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// Create local strategy
const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, function (
  email,
  password,
  done
) {
  User.findOne({ email: email }, function (err, user) {
    if (err) {
      console.log("Error: User.findOne: ", err);
      return done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        console.log("Error: comparePassword: ", err);
        return done(err);
      }
      if (!isMatch) {
        console.log("Not a Match: ", err);
        return done(null, false);
      }

      return done(null, true);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
