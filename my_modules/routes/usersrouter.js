//query express in order to use router and path module
const express = require('express');
var router = express.Router();
const path = require('path');
const dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
dotenv.config();

//const mongoose = require('mongoose');


// import user model
var User = require(path.join('../models/user-model.js'));

//register new user 
router.post('/register', function(req,res){
                  if(!req.body.username || !req.body.password){
                      res.json({success: false, msg: 'Please send username and password from client'});
                  } 
              var newUser = new User({
                    username: req.body.username,
                    password: req.body.password
              });
              
               newUser.save(function(err){
                         if(err)
                            return res.json({success: false, from: 'userduplicate', msg:'Username already present.'});

                         res.json({success: true, msg: 'Created new user!'});

                             
               });
          
});

//start of route post login//
router.post('/login',function(req,res,next){
    User.findOne({
        username: req.body.username
        
    }, function(err,user){

             if(err){
                next(err);
             } 
             
             if(!user) {
               res.status(401).json({success:false, from:'nouser', msg:'Authentication failed. User not found!'});
             } else {
                 user.comparePassword(req.body.password,function(err,isMatch){
                     if(isMatch && !err){
                         var token = jwt.sign(user.toJSON(), process.env.SECRET_JWT,{expiresIn:'1h'});
                         res.json({success: true, token: 'JWT ' + token});
                     } else {
                         res.status(401).json({success: false, from: 'wrongpass', msg: 'Wrong Password. Failed auth!'});
                     }
                 });
             }
    }); 
});

// logout route

router.get('/logout',(req,res,next)=>{
       console.log('run logout on server');
       res.status(200).send({ message: 'Logout-success!'});
});

module.exports= router;