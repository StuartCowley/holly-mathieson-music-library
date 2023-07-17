const express = require('express');
const {
  createArtist,
  getAllArtists,
  artistById,
} = require('../controllers/artists');
const app = express.Router();

app.post('/', createArtist);
app.get('/', getAllArtists);
app.get('/:id', artistById);

module.exports = app;
