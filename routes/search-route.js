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
  

  console.log("req.body ???????????????????????????", req.body)
  const search = req.body.searchTerm;
  console.log('body whatever this is ----------', search)

axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&type=gym&location=25.761681,-80.191788&radius=8050&key=AIzaSyCUertGINeIoS4nQ7zpyuJzqyUg1PhXXws`)
    .then((result)=>{
      // console.log("this is the result!!--->", result) //<<<just objects
      // console.log("this is the data--->", result.data) //<<<gives info
      const data = [];
  
      
      // array_of_promises = []
      
      const idSearch = result.data.results;
      
      idSearch.forEach(id => {
        
          const dataToSend = {
            name:'',
            place_id:'',
            week: [],
            formatted_address: '',
            rating: ''
          };

          dataToSend.name = id.name;
          dataToSend.place_id = id.place_id;
          dataToSend.formatted_address = id.formatted_address;
          dataToSend.rating = id.rating;
          placeID = id.place_id;
          // var week = [];

          // const the_promise_thing;

          // array_of_promises.push(the_promise_thing);
    
          // the_promise_thing = busy_hours(placuOd,...

          busy_hours(placeID, 'AIzaSyCUertGINeIoS4nQ7zpyuJzqyUg1PhXXws' )
          .then(busyhours => {
           dataToSend.week.push(busyhours.week);
            // console.log("something something something something", data)
            console.log(`hey hey hey hey hey`, dataToSend.week.day)
            // console.log(`YOOOOOO======>>>>>>>`, busyhours);
            // console.log(`YMAMAMAMAMAMA======>>>>>>>`, week);
            
          });
         
          return data.push(Object.assign({},dataToSend));
          
          
          
          
          // console.log("in the middle data console log ----->", data)
          
        })
        
        // all(array_of_promises){
          // res.json(data)
          // }
          // console.log("at end data console log---->" , data)  
          
          setTimeout(function(){
            res.json(data)
          }, 2000);
      })
      .catch((err) => {
        console.log(err)
        next(err);
      });
    });


    

  

  module.exports = router; 

  // console.log("check this !!!--->", req.body.search)
  
  // const search = 'equinox brickell';



    // console.log("idsearch is: ---> ",idSearch)

      // console.log(`place id --->${result.data.results[0].place_id}`)
    // console.log("information about results ==========================================")
    // console.log(result.data)
    // console.log("information about results ==========================================")
  
        // console.log(`*!*!*!*!*!**!!**!*!*!*!*!*!*!${idSearch}*!**!*!*!*!*!*!*!*!**!*!*!`);
      // console.log("element???" + id.place_id);
      // console.log(`each placeID ${placeID}`);
  
  
  
  
  //console.log("data to send", dataToSend)
      // dataToSend.name = id.name;
      // console.log(`each placeID ${placeID}`);
  
  // console.log (busyhours)
//  console.log('place id data ----------->', data); 
//  console.log("before: ", dataToSend.week.length);
//  dataToSend.week.push(data.week)
  
  
  
  
  // console.log("data to send in out: ", dataToSend)
  
  // result.data.results.forEach(element => {
    
    // console.log("element???" + element.place_id)
    //   return placeID = element.place_id;
    // });
    
    
    // res.json(idSearch)
    
    // console.log(result.data)
    
    
    //  console.log("data to send", dataToSend)
     
    // console.log('kajshdfkjhdasjkkjdhasf',data)

    // console.log("after: ", dataToSend.week.length);
    // res.json(dataToSend)

  //  data.week.forEach(day=>{
  //    dayOfWeek = day.day;
     
  //   //  hoursOfDay = day.hours;
  //   //  console.log('day of week ------>' + dayOfWeek);
  //    day.hours.forEach(hours=>{
  //       hourOfDay = hours.hour;
  //       busyPercent = hours.percentage;
  //       // console.log('time---->' + hourOfDay + ' ------ busy percent---->' + busyPercent)

  //    })

  //  })
   
  // console.log("data to send in mid: ", dataToSend)








