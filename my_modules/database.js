const mongoose = require('mongoose');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require(path.join(__dirname + '/models/user-model.js'));
const Poll = require(path.join(__dirname + '/models/poll-model.js'));
const usersrouter = require('./routes/usersrouter.js');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = function(app){
    //console.log(app);
var testUser = new User({username: 'George' , email: 'georgerdp@gmail.com', password: 'testpassword'}); 

var georgeCrisan = new User({username: 'george crisan' , email:'georgerdp@gmail.com', password: 'testpassword' });


app.get('/allpolls',(req,res)=>{
       //  console.log(req);
       Poll.find((err,elements)=>{
           if(err) console.log(err + 'Got this error' + err);
           res.send(elements);
       });

});

app.use(usersrouter); 
    } //end of export
