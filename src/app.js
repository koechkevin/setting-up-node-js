import express from 'express';
import bodyParser from 'body-parser';
import routes from './api/index';

const app = express();
app.use(bodyParser.json());
routes(app);

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'please check the route'
  })
});

export default app;