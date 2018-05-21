const express = require('express');
const router = express.Router();
const path = require('path');
var mongoose = require('mongoose');
const Poll = require(path.join('../models/poll-model.js'));

router.get('/allpolls',(req,res,next)=>{
    //  console.log(req);
    Poll.find((err,elements)=>{
        if(err){
            console.log(err + 'Got this error' + err);
            return next(err);
        } 
        res.send(elements);
    });

});


router.post('/createpoll',(req,res,next)=>{
    Poll.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });       

});


module.exports = router;