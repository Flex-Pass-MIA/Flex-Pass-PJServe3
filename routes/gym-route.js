const express     = require('express');
const router      = express.Router();
const passport    = require('passport');
const User        = require("../models/user");
const flash       = require("connect-flash");
const ensureLogin = require("connect-ensure-login");
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const Gym       = require('../models/gym');


router.post('/select-gyms', (req, res, next) => {
  console.log("who is the user: ", req.user)
  console.log("what is the body here: ", req.body)
  User.findById(req.body.userId)
  .then(user => {
    if(user.flexId){
      Gym.findById(user.flexId)
      .then( foundGym => {
        console.log("heyyy: ", user.membership === 'flex1');
        console.log("length: ", foundGym.gymList.length)

        if ((user.membership === 'flex1') && (foundGym.gymList.length < 2)){
          foundGym.gymList.push(req.body.gymId);
        } else if ((user.membership === 'flex2') && (foundGym.gymList.length < 5)){
          foundGym.gymList.push(req.body.gymId);
        } else if ((user.membership === 'flex3') && (foundGym.gymList.length < 10)){
          foundGym.gymList.push(req.body.gymId);
        } else {
          console.log("blahhhhhhh");
          res.json({message: "Gym limit exceeded."})
          return;
        }
        // foundGym.gymList.push(req.body.gymId);
        foundGym.save( err =>{
          console.log("found gym after save: ", foundGym)

          if (err){
            console.log("in the err");
            res.json(err);
            return;
          }
          res.status(200).json(foundGym);
        })
      }) 
      .catch( err => {
        console.log("err in the inner then: ", err);
      } )
    }  else {
      console.log("in the else");
        const newGym = new Gym({
          userID: user._id,
          gym: req.body.gymId
        })
        console.log("new gym before saving: ", newGym);
        newGym.gymList.push(newGym.gym);
        newGym.save(err => { 
          console.log("new gym after saving: ", newGym)
          if (err){
            res.json(err)
          }
          user.flexId = newGym._id;
          user.save(err => { 
            if (err){
              res.json(err)
            }
            res.status(200).json(newGym)
          })
        })
    } 
  })
  .catch( err => {
    console.log("outter then: ", err);
  })
})


router.get('/flex', (req, res, next) => {
  console.log("user in the SUPER backend: ", req.user)
  User.findById(req.user)
  .then(user => {
    if(user.flexId){
      Gym.findByIdAndUpdate(user.flexId)
      .then(usersGyms => { console.log(`This is the users information`, usersGyms) 
      res.status(200).json(usersGyms);
    })
    }
  });
});



module.exports = router;