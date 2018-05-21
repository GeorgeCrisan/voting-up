const express = require('express');
const path = require('path');
var passport = require('passport');
var User = require(path.join('../models/user-model.js'));
var router = express.Router();
const Verify = require(path.join('../verify.js'));
//register new user 
router.post('/authCA', function(req,res,next){
       User.register(new User({username: req.body.username }),req.body.password,(err,account)=>{
            if(err)
               return res.json({succes: false , msg: 'user already existing.' });
      
               
            passport.authenticate('local')(req,res,()=>{
            res.json({success: true, msg: 'Scuccesful created new user.' });
        });

    
             
       });     
});

router.post('/login',(req,res,next)=>{
    


});

router.get('/logout',(req,res,next)=>{
       console.log('run logout on server');
       req.logout();
       res.status(200).send({ message: 'Logout-success!'});
});

module.exports= router;