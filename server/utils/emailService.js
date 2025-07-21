const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendVerificationEmail = async (user) => {
  const verificationToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  const mailOptions = {
    from: 'CampusSphere <no-reply@campussphere.com>',
    to: user.email,
    subject: 'Verify Your Email',
    html: `<p>Click <a href="${process.env.BASE_URL}/verify-email?token=${verificationToken}">here</a> to verify your email</p>`
  };

  await transporter.sendMail(mailOptions);
};

exports.sendReminderEmail = async (user, event) => {
  const mailOptions = {
    to: user.email,
    subject: `Reminder: ${event.title}`,
    text: `Event: ${event.title}\nDate: ${event.date}\nLocation: ${event.location}`
  };

  await transporter.sendMail(mailOptions);
};