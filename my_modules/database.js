const mongoose = require('mongoose');
const path = require('path');
const Poll = require(path.join(__dirname + '/models/poll-model.js'));
const User = require(path.join(__dirname + '/models/user-model.js'));

module.exports = function(){
var testUser = new User({name: 'George' , email: 'georgerdp@gmail.com', password: 'testpassword'}); 
var georgeCrisan = new User({name: 'george crisan' , email:'georgerdp@gmail.com', password: 'testpassword' });
    georgeCrisan.save();
    testUser.save((err)=>{
        if(err)
           return console.error(err);
           //just call back 
           console.log('user posted');
    });
    


    var testPoll = new Poll({name: 'fist entry for test',
                                 createdBy: georgeCrisan._id ,
                                 options: [{value: 'any', votes: 100},{value:'any2',votes: 50 }],
                                users: [null,null,null,] ,
                                ips: [null,null,null ] 
                                 });

     testPoll.save((err,poll)=>{
             if(err) return console.error(err);
             return poll;
     }); 

    }