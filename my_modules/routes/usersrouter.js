const express = require('express');
var mongoose = require('mongoose');
const path = require('path');
var passport = require('passport');
var User = require(path.join('../models/user-model.js'));
var router = express.Router();
const Verify = require(path.join('../verify.js'));
const LocalStrategy = require('passport-local').Strategy;
//register new user 
router.post('/authCA', function(req,res){
       User.register(new User({username: req.body.username }),req.body.password,(err,account)=>{
            if(err)
               return res.json({succes: false , msg: 'user already existing.' });
      
               
            passport.authenticate('local')(req,res,()=>{
            res.json({success: true, msg: 'Scuccesful created new user.' });
        });

    
             
       });     
});

router.post('/login',(req,res)=>{
        var authenticate = User.authenticate();
        authenticate(req.body.username,req.body.passport,function(err,result){
            if(err) 
               console.log({err: err});

            res.send({confirm: 'success-login'});   
        });
});

router.get('/logout',(req,res)=>{
       req.logout();
       res.status(200).json({ message: 'Logut Succes!'});
});

module.exports= router;