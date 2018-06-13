const express     = require('express');
const router      = express.Router();
const passport    = require('passport');
const User        = require("../models/user");
const flash       = require("connect-flash");
const ensureLogin = require("connect-ensure-login");
const busy_hours = require('busy-hours');
const bodyParser   = require('body-parser');


const axios = require("axios");


//++++++++++++THIS ROUTE FINDS THE GYMS WITH GOOGLE SEARCH API+++++++++//

router.post('/gymsearch', notLogedIn, (req, res, next) => {
  

  console.log("req.body ???????????????????????????", req.body)
  const search = req.body.searchTerm;
  console.log('body whatever this is ----------', search)

  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&type=gym&location=25.761681,-80.191788&radius=8050&key=AIzaSyBHsQ5mbZ20-fri8maikgz2H_6Wmt64LZ0`)
    .then((result)=>{
      

      const finalData = [];
   
      const data = [];
    
      var idSearch = result.data.results;

      //this is to limit search results to 7, api has no way to limit results
      //using this method so user doesnt have to wait 10+ seconds for results
      var  arrLength = idSearch.length;
      var rand = Math.floor(Math.random() * 7);

      if(arrLength > 7){
      idSearch = idSearch.splice(0, 7);
      }

      //start of for each - here we go through results, and for each ID we have to save
      //certain info and run a google places api for scraping, and google photos api for 
      //photo for each location.
      idSearch.forEach(id => {
        
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

          //placing information into object
          dataToSend.name = id.name;
          dataToSend.place_id = id.place_id;
          dataToSend.formatted_address = id.formatted_address;
          dataToSend.rating = id.rating * 20;
          console.log('this is the location lat', id.geometry.location.lat)
          dataToSend.lat = id.geometry.location.lat;
          dataToSend.lng = id.geometry.location.lng;
          placeID = id.place_id;

         

          //busy hours is the google places api scraper that gets popular times information
          //to use to create busy times graph later on
          busy_hours(placeID, 'AIzaSyCUertGINeIoS4nQ7zpyuJzqyUg1PhXXws' )
          .then(popTimes => {

            //the if because some locations dont have busy data, causes a crash/stop when it doesn't have one.
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

          //this runs the google photos api for each ID with its reference, needed to get the photo for each location
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

          })}},2000);


          dataToSend.busyTimes.push(busyData)
          
          setTimeout(function(){
          data.push(Object.assign({},dataToSend));
          },3500);
        

          
        })

        /////end of for each

        //the set timeouts are to allow time for all the data to be pushed in--hacky way to do it --
        //but without it all the information wouldnt push through.
          setTimeout(function(){

            res.json(data);
            
          }, 4500);
      })
      .catch((err) => {
        console.log(err)
        next(err);
      });
    });


    
function notLogedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
}
  

  module.exports = router; 

  







