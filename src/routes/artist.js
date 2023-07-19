const express = require('express');
const {
  createArtist,
  readAllArtists,
  readArtistById,
  updateArtist,
  deleteArtist,
} = require('../controllers/artists');

const { createAlbum } = require('../controllers/albums');
const artistRouter = express.Router();

artistRouter.post('/artists/', createArtist);
artistRouter.get('/artists/', readAllArtists);
artistRouter.get('/artists/:id', readArtistById);
artistRouter.patch('/artists/:id', updateArtist);
artistRouter.delete('/artists/:id', deleteArtist);
artistRouter.post('/artists/:id/albums', createAlbum);

module.exports = artistRouter;
