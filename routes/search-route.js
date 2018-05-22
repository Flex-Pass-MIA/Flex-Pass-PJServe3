const express     = require('express');
const router      = express.Router();
const passport    = require('passport');
const User        = require("../models/user");
const flash       = require("connect-flash");
const ensureLogin = require("connect-ensure-login");


const axios = require("axios");


router.get('/gymsearch', (req, res, next) => {

  console.log("check this !!!--->", req.body.search)

  const search = 'yoga';
  

  axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&type=gym&location=25.761681,-80.191788&radius=8050&key=AIzaSyCUertGINeIoS4nQ7zpyuJzqyUg1PhXXws`)
  .then((result)=>{
     console.log("this is the result!!--->", result) //<<<just objects
    console.log("this is the data--->", result.data) //<<<gives info
    
    res.json(result)
    })
    .catch((err) => {
      next(err);
    });
    // console.log(result.data)
  })
















module.exports = router;