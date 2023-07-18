const express = require('express');
const {
  createArtist,
  getAllArtists,
  artistById,
  updateArtist,
  deleteArtist,
} = require('../controllers/artists');
const app = express.Router();

app.post('/artists/', createArtist);
app.get('/artists/', getAllArtists);
app.get('/artists/:id', artistById);
app.patch('/artists/:id', updateArtist);
app.delete('/artists/:id', deleteArtist);

module.exports = app;
