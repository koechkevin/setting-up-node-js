import nodeMailer from 'nodemailer';
import models from '../../database/models';
import html from '../../templates/email';

const sendMail = (mailOptions) => {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  return transporter.sendMail(mailOptions, () => {});
};

const createContact = async (req, res) => {
  try {
    const {
      body: {
        name, email, phone, message
      }
    } = req;
    const contact = {
      name, email, phone, message
    };
    const createdContact = await models.Contacts.create(contact);
    const myOptions = {
      from: createdContact.email,
      to: process.env.EMAIL_RECIPIENT,
      subject: 'Your portfolio',
      text: 'text',
      html: html({
        recipientName: 'Koech',
        message: createdContact.message,
        senderName: createdContact.name
      })
    };
    const contactOptions = {
      from: 'no-reply@koech-kevin.herokuapp.com',
      to: createdContact.email,
      subject: 'Message to Kevin Koech',
      text: 'text',
      html: html({
        recipientName: createdContact.name,
        message: `Your message has been sent to Koech. He will get back to you once he opens it. 
        "${createdContact.message}"`,
        senderName: 'Koech\'s email sender'
      })
    };
    sendMail(myOptions);
    sendMail(contactOptions);
    res.status(201).json({
      message: 'created successfully',
      createdContact
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
};

export default { createContact };
