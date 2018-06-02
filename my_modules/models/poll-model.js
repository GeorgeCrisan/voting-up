const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const PollSchema = new Schema({
      topic: {
          type: String,
          required: true
      }, 
      createdBy: {
          type: String
        },
        options:{
            type: Array,
            required: true 
        },
        postTime: {
            type: Date,
            default: Date.now
        },
        voteNumbers:{
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