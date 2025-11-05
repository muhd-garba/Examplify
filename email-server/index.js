const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());

app.post('/send-invitation', async (req, res) => {
  const { candidates, testName, testDate } = req.body;
  if (!candidates || !Array.isArray(candidates)) {
    return res.status(400).json({ error: 'Candidates array required.' });
  }

  const emailPromises = candidates.map(email => {
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER, // Your verified sender email
      subject: `Invitation to ${testName}`,
      text: `You are invited to take the test: ${testName} on ${testDate}.`,
      html: `<strong>You are invited to take the test: ${testName} on ${testDate}.</strong>`
    };
    return sgMail.send(msg);
  });

  try {
    await Promise.all(emailPromises);
    res.json({ success: true, message: 'Invitations sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send emails.' });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});
