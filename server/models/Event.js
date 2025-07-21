const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  category: {
    type: String,
    enum: ['academic', 'cultural', 'sports', 'workshop'],
    required: true
  },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reminders: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    remindAt: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);