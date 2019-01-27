import express from 'express';
import routes from './api/index';

const app = express();

routes(app);

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'please check the route'
  })
});

export default app;