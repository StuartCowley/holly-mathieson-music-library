const express = require('express');
const {
  createArtist,
  getAllArtists,
  artistById,
  updateArtist,
} = require('../controllers/artists');
const app = express.Router();

app.post('/', createArtist);
app.get('/', getAllArtists);
app.get('/:id', artistById);
app.patch('/:id', updateArtist);

module.exports = app;
