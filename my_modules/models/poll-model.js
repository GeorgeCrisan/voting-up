const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const OptionSchema = new Schema({
     value: {type: String, required: true},
     votes: {type: Number, default: 0 }
});

const PollSchema = new Schema({
      name: {
          type: String,
          required: 'Pool name is required'
      }, 
      createdBy: {
          type: Schema.Types.ObjectId ,
           ref: 'User'
        },
        options:{
            type:[OptionSchema],
            required: 'Poll should have at least two options',
            validate:[function(val){
                   return val.length >= 2
            },'Poll should have at least two options'
            ]
        },
        users: [{type: Schema.Types.ObjectId , ref:'User'}], // auth users who voted in this specific poll
        ips: [{type: String}] //ips of users who voted


});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;