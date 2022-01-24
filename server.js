const express = require('express');
require('dotenv').config();

const { connectDB } = require('./lib/db');
const Developer = require('./models/Developers');

const app = express();

app.use(express.json());

app.use('/api/v1/dev', require('./routes/dev'));

app.all('*', (_, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Request resource not found',
  });
});

connectDB();

app.listen(process.env.PORT || 4000, () => {
  console.log('Server started');
});
