import express from 'express';
import UsersRouter from './routers/usersRouter';
import ContactsRouter from './routers/contactsRouter';


const router = express.Router();
const prefix = '/api/v1';
const routes = (app) => {
  router.use(UsersRouter);
  router.use(ContactsRouter);
  app.use(prefix, router);
  return app;
};

export default routes;
