const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const Schema = mongoose.Schema; 

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
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

UserSchema.plugin(plm);
const User = mongoose.model('User', UserSchema);

module.exports = User;
