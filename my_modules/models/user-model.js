const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema; 

const UserSchema = new Schema({
     name: {
         type: String,
         required: 'Name is required'
     },
     email: {
         type: String,
         required: 'Email is required',
         match: [/.+\@.+\..+/, "Please enter a valid email"]
     },
     password: {
         type: String ,
         required: 'Password is required'
     }
},{collection: 'users' });

UserSchema.methods.hashPassword = function(password){
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.validPassword = function(password){

         return bcrypt.compareSync(password,this.password);

}

const User = mongoose.model('User', UserSchema);

module.exports = User;
