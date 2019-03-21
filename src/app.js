import express from 'express';
import expressValidator from 'express-validator';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './api/index';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(expressValidator());
routes(app);

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'please check the route'
  });
});

export default app;
