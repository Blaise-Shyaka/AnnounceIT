import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan';
import router from './routes/router';
import env from 'dotenv';

const app = express();

env.config();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/', router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`We're listening on port ${port}`);
});

export default app;
