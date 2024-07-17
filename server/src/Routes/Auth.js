const express = require("express");
const passport = require("passport");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    // console.log(user);
    if (!user) {
      return res.redirect("/");
    }
    console.log("User:", user);

    if (!process.env.JWTSECRETKEY) {
      console.error("JWT Secret Key is not defined");
      return res.status(500).send("Internal Server Error");
    }
    const jwttoken = jwt.sign(
      { user: user.toJSON() },
      process.env.JWTSECRETKEY
    );
    res.redirect(`https://verydesi.com/login?jwttoken=${jwttoken}`);
  }
);

router.get("/auth/apple", passport.authenticate("apple"));

router.post(
  "/auth/apple/callback",
  passport.authenticate("apple", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    const jwttoken = jwt.sign({ user: user.toJSON() }, JWTSECRETKEY);
    res.redirect("/dashboard");
  }
);

module.exports = router;
