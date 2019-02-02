import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import routes from './api/index';

const app = express();
app.use(bodyParser.json());
app.use(expressValidator());
routes(app);

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'please check the route'
  })
});

export default app;