const mongoose = require('mongoose');
const path = require('path');
const Poll = require(path.join(__dirname + '/models/poll-model.js'));
const User = require(path.join(__dirname + '/models/user-model.js'));

module.exports = function(app){
    //console.log(app);
var testUser = new User({name: 'George' , email: 'georgerdp@gmail.com', password: 'testpassword'}); 

var georgeCrisan = new User({name: 'george crisan' , email:'georgerdp@gmail.com', password: 'testpassword' });

var testPoll = new Poll({name: 'Another entry I may say would be useful for testing',
createdBy: georgeCrisan._id ,
options: [{value: 'alege varianta 1 ', votes: 100},{value:'alege varianta 2',votes: 50 }],
users: [null,null,null,] ,
ips: [null,null,null ] 
});



app.post('/allpolls',(req,res)=>{
       //  console.log(req);
       Poll.find((err,elements)=>{
           if(err) console.log(err + 'Got this error' + err);
           res.send(elements);
       });

});

app.post('/allusers',(req,res)=>{
    User.find((err,results)=>{
        if(err) console.log(err + 'Got thi error from user query ');
        res.send(results);
   })

});

    } //end of export
