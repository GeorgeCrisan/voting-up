const express = require('express');
const router = express.Router();
const path = require('path');
let passport = require('passport');
var mongoose = require('mongoose');
const Poll = require(path.join('../models/poll-model.js'));



router.get('/allpolls',(req,res,next)=>{

    Poll.find((err,elements)=>{
        if(err){
            return next(err);
        } 
        res.send(elements);
    });

}); 

router.post('/createpoll',passport.authenticate('jwt',{session:false}),function(req,res,next){

            let dataToPass = {
                options : req.body.options,
                question: req.body.question,
                createdBy: req.user.username
          }
           
      Poll.create(dataToPass, function (err, post) {
          if (err) {
           return next(err);
          }
          res.json({success: true, msg: 'Poll created!'});
        });         

});


module.exports = router;