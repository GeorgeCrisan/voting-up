const express = require('express');
const router = express.Router();
const path = require('path');
let passport = require('passport');
var mongoose = require('mongoose');
const Poll = require(path.join('../models/poll-model.js'));

/*router.get('/sharedpoll/:id',(req,res,next)=>{
           let query = req.params.id;
           res.json({success:true,msg:'query', id: query});

});*/

router.get('/allpolls',(req,res,next)=>{

    Poll.find((err,elements)=>{
        if(err){
            return next(err);
        } 
        res.send(elements);
    });

}); 

router.post('/deletepoll',passport.authenticate('jwt',{session:false}),function(req,res){

       console.log(req.body.userId, req.user._id);
         if(req.body.userId == req.user._id){
            Poll.findByIdAndRemove(req.body.pollToDeletebyId,function(err,resret){
                if(err){throw err;}
                else{
                     res.status(200).send({success: true,from:'poll deleted',id:resret._id });
                }
           });
         } else {
            res.status(401).send({success: false,from:'poll deleted',msg:"Not authorized."});
         }

       
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

router.post('/optionsUpdate/:id',passport.authenticate('jwt',{session:false}),function(req,res,next){

            let querry = String(req.params.id);
            Poll.findByIdAndUpdate(querry,{$set:{options:req.body}},function(err,data){
                  if(err)
                     next(err);
                  else{
                    res.json({success: true, msg: 'Options Updated'});
                  }   
            });

            
  });

router.post('/createpoll',passport.authenticate('jwt',{session:false}),function(req,res,next){
             console.log(req.body.userId, req.user._id);
            let dataToPass = {
                options : req.body.options,
                question: req.body.question,
                createdBy: req.user.username
          }
          dataToPass.options.forEach(element => {
               element.votes = 0;


          });
           
      if(req.body.userId == req.user._id){
        Poll.create(dataToPass, function (err, post) {
            if (err) {
             return next(err);
            }
            res.json({success: true, msg: 'Poll created!'});
          });
      } else {
        res.json({success: false, msg: 'Not allowed to create Poll!'});
      }         

});

router.post('/updatePolls',function(req,res,next){


            let query = {_id:req.body._id};

            Poll.findOneAndUpdate(query,{$set:req.body},{new: true},function(err,data){
                      if(err)
                         next(err);
                       else {
                        res.json({success: true, msg: 'Full update resolved',data:data});
                       }   
            });

            
});


module.exports = router;