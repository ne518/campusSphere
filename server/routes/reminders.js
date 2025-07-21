const express = require('express');
const router = express.Router();
const { addReminder } = require('../controllers/reminderController');
const { protect } = require('../middleware/auth');

router.post('/:eventId', protect, addReminder);

module.exports = router;