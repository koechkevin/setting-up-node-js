import express from 'express';
import ContactController from '../controllers/contactController';
import ContactValidator from '../validators/contactValidator';

const ContactsRouter = express.Router();
const { createContact } = ContactController;
const { contactValidator } = ContactValidator;
ContactsRouter.post(
  '/contact',
  contactValidator,
  createContact
);

export default ContactsRouter;
