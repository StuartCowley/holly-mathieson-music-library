const express = require('express');
const app = express();

app.post('../controllers/artist.js', (req, res) => {
  res.send('POST request to create artist');
});

module.exports = { app };
