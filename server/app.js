const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./routes/router');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/', router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`We're listening on port ${port}`);
});

module.exports = app;
