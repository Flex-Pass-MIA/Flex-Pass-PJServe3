const express     = require('express');
const router      = express.Router();
const passport    = require('passport');
const User        = require("../models/user");
const flash       = require("connect-flash");
const ensureLogin = require("connect-ensure-login");
const busy_hours = require('busy-hours');
const bodyParser   = require('body-parser');


const axios = require("axios");


router.post('/gymsearch', (req, res, next) => {

  // console.log("check this !!!--->", req.body.search)

  // const search = 'equinox brickell';
  // console.log("req.body ???????????????????????????", req.body)
  const search = req.body.search;
  // console.log('body whatever this is ----------', search)
  

  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&type=gym&location=25.761681,-80.191788&radius=8050&key=AIzaSyCUertGINeIoS4nQ7zpyuJzqyUg1PhXXws`)
  .then((result)=>{
    // console.log("this is the result!!--->", result) //<<<just objects
    // console.log("this is the data--->", result.data) //<<<gives info
    // console.log(`place id --->${result.data.results[0].place_id}`)
    // console.log("information about results ==========================================")
    // console.log(result.data)
    // console.log("information about results ==========================================")
    const idSearch = result.data.results;
    idSearch.forEach(id =>{
      // console.log(`*!*!*!*!*!**!!**!*!*!*!*!*!*!${idSearch}*!**!*!*!*!*!*!*!*!**!*!*!`);

      // console.log("element???" + id.place_id);
      // console.log(`each placeID ${placeID}`);
      placeID = id.place_id;
      // console.log(`each placeID ${placeID}`);
        busy_hours(placeID, 'AIzaSyCUertGINeIoS4nQ7zpyuJzqyUg1PhXXws' )
        .then(data => {
        //  console.log('place id data ----------->', data); 

         data.week.forEach(day=>{
           dayOfWeek = day.day;
          //  hoursOfDay = day.hours;
          //  console.log('day of week ------>' + dayOfWeek);

           day.hours.forEach(hours=>{


              hourOfDay = hours.hour;
              busyPercent = hours.percentage;
              // console.log('time---->' + hourOfDay + ' ------ busy percent---->' + busyPercent)
              

           })

         })
         
     });
      
    })
    
    // result.data.results.forEach(element => {

      // console.log("element???" + element.place_id)
    //   return placeID = element.place_id;
    // });

    
    res.json(idSearch)
    })
    .catch((err) => {
      next(err);
    });
    // console.log(result.data)
  })
















module.exports = router;