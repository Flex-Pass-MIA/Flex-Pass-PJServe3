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

axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&type=gym&location=25.761681,-80.191788&radius=8050&key=AIzaSyBHsQ5mbZ20-fri8maikgz2H_6Wmt64LZ0`)
    .then((result)=>{
      

      const finalData = [];
   
      const data = [];
      
      // const busyData = [];

      const idSearch = result.data.results;

      console.log("these are the results", idSearch)
      
      idSearch.forEach(id => {
        
          const dataToSend = {
            name:'',
            place_id:'',
            formatted_address: '',
            rating: '',
            busyTimes: []
          };

          const busyData = [];


          dataToSend.name = id.name;
          dataToSend.place_id = id.place_id;
          dataToSend.formatted_address = id.formatted_address;
          dataToSend.rating = id.rating;
          placeID = id.place_id;
         


          busy_hours(placeID, 'AIzaSyCUertGINeIoS4nQ7zpyuJzqyUg1PhXXws' )
          .then(popTimes => {
          //  dataToSend.week.push(popTimes.week);

            popTimes.week.forEach(dayOfWeek=>{
              // console.log('this is the day of week', dayOfWeek);
              const busyHours = {
                day:'',
                busyInfo: [],
              }
              busyHours.day = dayOfWeek.day;
              busyHours.busyInfo.push(dayOfWeek.hours);
              busyData.push(Object.assign({},busyHours));
              

    
            })

            
          });

          
          // console.log('this is the busy data ---->', busyTimes);

          dataToSend.busyTimes.push(busyData)
          
          
          data.push(Object.assign({},dataToSend));
        

          
        })

         
          setTimeout(function(){


            res.json(data);
            
          }, 2500);
      })
      .catch((err) => {
        console.log(err)
        next(err);
      });
    });


    

  

  module.exports = router; 

  







