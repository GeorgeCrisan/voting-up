const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const Schema = mongoose.Schema; 

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});

UserSchema.plugin(plm);
const User = mongoose.model('User', UserSchema);

module.exports = User;
