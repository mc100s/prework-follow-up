const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema = new Schema({  
  _user: {
    type: Schema.Types.ObjectId,
    required: [true, 'A participant need to be associated to own user'],
    ref: 'User',
  },
  bootcampName: String,
  city: String,
  exercises: [{
    name: String,
    link: String,
    status: String,
    shortFeedback: String,
  }],
  messages: [{
    text: String,
    date: Date,
    _sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;