const express = require('express');
// const { Artist } = require('../models/index');
const app = express();

app.use(express.json());

app.use('/artists', require('./routes/artist'));

module.exports = app;
