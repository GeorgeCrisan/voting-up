const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const PollSchema = new Schema({
      topic: {
          type: String,
          required: true
      }, 
      createdBy: {
          type: String,
           ref: 'User'
        },
        options:{
            type: Array,
            required: true 
        },
        postTime: {
            type: Date,
            default: Date.now
        },
        voteNumber:{
            type: Number,
            default: 0
        },
        type:{
            type: String,
            default: 'public'
        }


},{collection: 'polls'});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;