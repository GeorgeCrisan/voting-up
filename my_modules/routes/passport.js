// query in vars jvt strategy and export method
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
dotenv.config();

// import user model
var User = require(path.join('../models/user-model.js'));
var securitySettings = process.env.SECRET_JWT;

module.exports = function passportStrategyJwt(){
    
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = securitySettings;
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
             User.findById(jwt_payload._id,function(err,user){
                 if (err) {
                    return done(err,false);
                 }
                     
                  if(user){
                    done(null, user);
                }
                  else {
                    done(null, false); 
                  }
                        
             });   

    }));
};

