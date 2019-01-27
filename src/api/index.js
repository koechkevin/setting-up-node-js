import UsersRouter from './usersRouter';

const routes = (app) => {
  app.use(UsersRouter);
  return app;
};

export default routes;
