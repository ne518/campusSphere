const Event = require('../models/Event');
const { sendReminderEmail } = require('../utils/emailService');

exports.addReminder = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { $push: { reminders: {
        userId: req.user.id,
        remindAt: req.body.remindAt
      }}},
      { new: true }
    );
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.checkReminders = async () => {
  const now = new Date();
  const events = await Event.find({
    'reminders.remindAt': { $lte: now }
  }).populate('reminders.userId', 'email');

  events.forEach(event => {
    event.reminders.forEach(async reminder => {
      if (reminder.remindAt <= now) {
        await sendReminderEmail(reminder.userId, event);
        await Event.updateOne(
          { _id: event._id },
          { $pull: { reminders: { _id: reminder._id } } }
        );
      }
    });
  });
};