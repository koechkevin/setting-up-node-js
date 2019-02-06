import express from 'express';
import UsersRouter from './routers/usersRouter';

const router = express.Router();
const prefix = '/api/v1';
const routes = (app) => {
  router.use(UsersRouter);
  app.use(prefix, router);
  return app;
};

export default routes;
