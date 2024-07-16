const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const AppleStrategy = require("passport-apple-signin").Strategy;
const User = require("../model/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          isVerified: true,
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// passport.use(
//   new AppleStrategy(
//     {
//       clientID: "YOUR_APPLE_CLIENT_ID",
//       teamID: "YOUR_APPLE_TEAM_ID",
//       callbackURL: "/api/auth/apple/callback",
//       keyID: "YOUR_APPLE_KEY_ID",
//       privateKeyLocation: "./config/AuthKey.p8",
//       scope: ["email", "name"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const existingUser = await User.findOne({ appleId: profile.id });

//         if (existingUser) {
//           return done(null, existingUser);
//         }

//         const newUser = new User({
//           appleId: profile.id,
//           email: profile.email,
//           firstName: profile.firstName,
//           lastName: profile.lastName,
//         });

//         await newUser.save();
//         done(null, newUser);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

module.exports = passport;
