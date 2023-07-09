const express = require('express');
const app = express();

const artistRouter = require('./routes/artist.js');

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

module.exports = app;
