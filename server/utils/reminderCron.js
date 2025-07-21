const cron = require('node-cron');
const Event = require('../models/Event');
const { sendReminderEmail } = require('./emailService');

const checkReminders = async () => {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 3600000);

  const events = await Event.find({
    'reminders.remindAt': {
      $gte: now,
      $lte: oneHourLater
    }
  }).populate({
    path: 'reminders.userId',
    select: 'email'
  });

  events.forEach(event => {
    event.reminders.forEach(async reminder => {
      if (reminder.remindAt >= now && reminder.remindAt <= oneHourLater) {
        await sendReminderEmail(reminder.userId, event);
        // Remove sent reminder
        await Event.updateOne(
          { _id: event._id },
          { $pull: { reminders: { _id: reminder._id } } }
        );
      }
    });
  });
};

// Run every 15 minutes
cron.schedule('*/15 * * * *', checkReminders);

module.exports = checkReminders;