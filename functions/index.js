const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

// Set your SendGrid API Key in Firebase environment config
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendTestInvitation = functions.firestore
  .document('tests/{testId}')
  .onCreate(async (snap, context) => {
    const testData = snap.data();
    const candidates = testData.candidates || [];
    const testName = testData.name || 'Exam';
    const testDate = testData.date || '';

    const emailPromises = candidates.map(email => {
      const msg = {
        to: email,
        from: 'your_verified_sender@example.com', // Change to your verified sender
        subject: `Invitation to ${testName}`,
        text: `You are invited to take the test: ${testName} on ${testDate}.`,
        html: `<strong>You are invited to take the test: ${testName} on ${testDate}.</strong>`
      };
      return sgMail.send(msg);
    });

    try {
      await Promise.all(emailPromises);
      console.log('Invitations sent to candidates.');
    } catch (error) {
      console.error('Error sending invitations:', error);
    }
    return null;
  });
