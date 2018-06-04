// query in vars jvt strategy and export method
const dotenv = require('dotenv');
const path = require('path');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
dotenv.config();

// import user model
var User = require(path.join('../models/user-model.js'));
var securitySettings = process.env.SECRET_JWT;

function passportStrategyJwt(passport){
    
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = securitySettings;
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
             User.findOne({_id: jwt_payload._id},function(err,user){
                 if (err) 
                     return done(err,false);
                  if(user){
                      console.log('de aici avem user');
                    console.log(user);
                    done(null, user);
                }
                  else 
                     done(null, false);    
             });   

    }));
};

module.exports = passportStrategyJwt;