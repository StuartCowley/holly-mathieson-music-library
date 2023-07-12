const express = require('express');
const { createArtist } = require('../controllers/artists');
const app = express.Router();

app.post('/artists', createArtist);

module.exports = { app, createArtist };
