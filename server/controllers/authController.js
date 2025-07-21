const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/emailService');

exports.register = async (req, res) => {
  try {
    const { email, password, role = 'student' } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = await User.create({ email, password, role });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    await sendVerificationEmail(user);
    res.status(201).json({ token, user: { id: user._id, email, role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};