const express = require('express');
// const { Artist } = require('../models');
const app = express();

const { artistRouter } = require('./routes/artist.js');

app.use(express.json());

app.use(artistRouter);

module.exports = app;
