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

router.get('/mypolls',passport.authenticate('jwt',{session:false}),function(req,res,next){
          let query = req.user.username;
        Poll.find({createdBy: query},function(err,docs){
            if(err){
                return next(err);
            } 
            res.send(docs);
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

router.post('/updatePolls',function(req,res,next){

            let query = {_id:req.body._id};
            Poll.findOneAndUpdate(query,{$set:req.body},{new: true},function(err,data){
                      if(err)
                         next(err);
                       else {
                        res.json({success: true, msg: 'Full update resolved'});
                       }   
            });

            
});


module.exports = router;