const express     = require('express');
const router      = express.Router();
const passport    = require('passport');
const User        = require("../models/user");
const flash       = require("connect-flash");
const ensureLogin = require("connect-ensure-login");
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
const Gym       = require('../models/gym');
const axios = require("axios");
const busy_hours = require('busy-hours');


router.post('/select-gyms', (req, res, next) => {
  // console.log("who is the user: ", req.user)
  console.log("what is the body here: ", req.body)
  User.findById(req.body.userId)
  .then(user => {
    if(user.flexId){
      Gym.findById(user.flexId)
      .then( foundGym => {
        // console.log("heyyy: ", user.membership === 'flex1');
        // console.log("length: ", foundGym.gymList.length)

        if ((user.membership === 'flex1') && (foundGym.gymList.length < 2)){
          foundGym.gymList.push(req.body.gymId);
        } else if ((user.membership === 'flex2') && (foundGym.gymList.length < 5)){
          foundGym.gymList.push(req.body.gymId);
        } else if ((user.membership === 'flex3') && (foundGym.gymList.length < 10)){
          foundGym.gymList.push(req.body.gymId);
        } else {
          // console.log("blahhhhhhh");
          res.json({message: "Gym limit exceeded."})
          return;
        }
        // foundGym.gymList.push(req.body.gymId);
        foundGym.save( err =>{
          // console.log("found gym after save: ", foundGym)

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
      // console.log("in the else");
        const newGym = new Gym({
          userID: user._id,
          gym: req.body.gymId
        })
        // console.log("new gym before saving: ", newGym);
        newGym.gymList.push(newGym.gym);
        newGym.save(err => { 
          // console.log("new gym after saving: ", newGym)
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
    // console.log("outter then: ", err);
  })
})

//route for returning the users gyms in dashboard
router.post('/flex', (req, res, next) => {
  console.log("bodyyyy: ", req.body)
  console.log("user in the SUPER backend: ", req.body._id)
  User.findById(req.body._id)
  .then(user => {


    //if user has a pass, and gyms, it's gyms are saved by the google api's place ID. 
    //using those gym id's we use google place api to return info for the current users gym
    //within their dashboard - and for the most part repeats a similar search like in
    //the search route
    if(user.flexId){

      Gym.find({_id:user.flexId})
      .then(usersGyms => { 

        
        const data = [];

        usersGyms[0].gymList.forEach((gymListOfIDs)=>{
          
          axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${gymListOfIDs}&key=AIzaSyBHsQ5mbZ20-fri8maikgz2H_6Wmt64LZ0`)
          .then((gymInfo)=>{


            const id = gymInfo.data.result;

              const dataToSend = {
                name:'',
                place_id:'',
                formatted_address: '',
                rating: '',
                busyTimes: [],
                lat: '',
                lng: '',
                pic: '',
              };
    
              

              const busyData = [];

              
              dataToSend.name = id.name;
              dataToSend.place_id = id.place_id;
              dataToSend.formatted_address = id.formatted_address;
              dataToSend.rating = id.rating * 20;
              dataToSend.lat = id.geometry.location.lat;
              dataToSend.lng = id.geometry.location.lng;
              placeID = id.place_id;

              
              
              busy_hours(placeID, 'AIzaSyCUertGINeIoS4nQ7zpyuJzqyUg1PhXXws' )
              .then(popTimes => {

    
                if(popTimes.week){
                popTimes.week.forEach(dayOfWeek=>{

                  const busyHours = {
                    day:'',
                    busyInfo: [],
                  }
                  busyHours.day = dayOfWeek.day;
                  busyHours.busyInfo.push(dayOfWeek.hours);
                  busyData.push(Object.assign({},busyHours));
                  
        
                })}
    
                
              })
              .catch((err)=>{
                console.log(err)
                next(err);
              })
    
    
              var imgData = '';
              setTimeout(function(){
              if(id.photos){
              id.photos.forEach(photoRef =>{
                const reference = photoRef.photo_reference;
                

                axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${reference}&key=AIzaSyCUertGINeIoS4nQ7zpyuJzqyUg1PhXXws`)
                .then( (refResult) =>{
    

                  const theImgUrl = {
                    imgUrl: ''
                  }
    
                  theImgUrl.imgUrl = refResult.config.url;

                  
                  imgData = theImgUrl.imgUrl

    
                  dataToSend.pic = imgData;

    
                })
                .catch((err) => {
                  console.log(err)
                  next(err);
                });
                
    
                
    
              })}},2750);
    
    
              dataToSend.busyTimes.push(busyData)
              
              setTimeout(function(){
              data.push(Object.assign({},dataToSend));
              },5000);



          })
          .catch((err)=>{
            console.log(err)
            next(err);
          })
          

        })

        setTimeout(function(){


          res.json(data);
          
        }, 6500);


    })
      .catch(err =>{
      console.log('the error for the /flex get', err)
    })
    }
  });
});


router.post('/delete-gym', (req, res) => {
  User.findById(req.body.userId)
  .then(user => {

    if(user.flexId) {
      Gym.find({_id:user.flexId})
      .then(usersGyms => { 
        console.log("before: ", usersGyms[0].gymList)
          var toBeDeleted = usersGyms[0].gymList.indexOf(req.body.gymId);
          usersGyms[0].gymList.splice(toBeDeleted, 1);
          console.log("after: ", usersGyms[0].gymList)
          usersGyms[0].save( err => {
            if(err){
              res.json(err);
              return;
            }
            res.status(200).json(usersGyms);
          })
      })
    }
  })
})

router.post('/gymlist/replaceGym', (req, res, next)=>{

  User.findById(req.body.userId)
  .then(user => {

    if(user.flexId) {
      Gym.find({_id:user.flexId})
      .then(usersGyms => { 
        console.log("before: ", usersGyms[0].gymList)
          var toBeReplaced = usersGyms[0].gymList.indexOf(req.body.gymId);
          var originalGym = usersGyms[0].gymList.indexOf(req.body.gymId);
          usersGyms[0].gymList.splice(toBeReplaced, 1);
          console.log("after: ", usersGyms[0].gymList)



          usersGyms[0].save( err => {
            if(err){
              res.json(err);
              return;
            }
            res.status(200).json(usersGyms);
          })
      })
    }
  })



})



module.exports = router;