const express     = require('express');
const router      = express.Router();
const passport    = require('passport');
const User        = require("../models/user");
const flash       = require("connect-flash");
const ensureLogin = require("connect-ensure-login");

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

router.post('/signup', (req, res, next) => {
  if (req.body.username === '' || req.body.password === '' || req.body.email === '' ||
  req.body.firstname === '' || req.body.lastname === '' || req.body.phone === '' ||
  req.body.dob === '' || req.body.address === '' || req.body.membership === '') {
    res.status(400).json({ message: "Please fill information"})
  }
  User.findOne({ userName: req.body.username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "Sorry, that username already exists" });
      return;
    }
   
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      dob: req.body.dob,
      address: req.body.address,
      phone: req.body.phone,
      membership: req.body.membership,
      username: req.body.username,
      password: hashPass,
    })
    newUser.save((err) => {
      if (err) {
        res.status(400).json({ message: "Something went wrong" });
        return;
      }
    });
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    // console.log(`the user---> ${theUser}`)
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

      // We are now logged in (notice req.user)
      res.status(200).json(req.user);
    });
  })(req, res, next);
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

  res.status(403).json({ message: 'Unauthorized' });
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success' });
});




module.exports = router;
