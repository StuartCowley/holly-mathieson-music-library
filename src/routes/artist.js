const express = require('express');
const { createArtist } = require('../controllers/artists');
const app = express.Router();

app.post('/', createArtist);

module.exports = app;
