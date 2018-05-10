const express = require('express');
var mongoose = require('mongoose');
const path = require('path');
var passport = require('passport');
var User = require(path.join('../models/user-model.js'));
var router = express.Router();

router.post('/authCA', function(req,res){
       User.register(new User({username: req.body.username }),req.body.password,(err,account)=>{
            if(err)
               return res.json({succes: false , msg: 'user already existing.' });

             passport.authenticate('local')(req,res,()=>{
                 res.json({success: true, msg: 'Scuccesful created ne user.' });
             });
       });     
});

router.get('/authCA',function(req,res){
         res.redirect('/loggedin');
})

module.exports= router;