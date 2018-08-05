const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema; 

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
     },
     pollsCreated:{
         type: Array,
         default:[]
     },
     pollsVoted:{
         type: Array,
         default: []
     }
});

UserSchema.pre('save',function(next){
       var user = this;
       if(this.isModified('password') || this.isNew){
           bcrypt.genSalt(10,function(err,salt){
                if (err) {
                    return next(err);
                }
              bcrypt.hash(user.password,salt,null,function(err,hash){
                   if(err)
                     return next(err);
                    
                   user.password = hash;
                   next();  
              });
           });
       } else {
           return next();
       }
});

UserSchema.methods.comparePassword = function(pass,cb){
      bcrypt.compare(pass, this.password , function(err, isMach){
            if(err){
                return cb(err);
            }
            cb(null,isMach);
      });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;

