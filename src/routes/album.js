const express = require('express');
const {
  createAlbum,
  readAllAlbums,
  readAlbumById,
} = require('../controllers/albums');
const albumRouter = express.Router();

albumRouter.post('/artists/:id/albums', createAlbum);
albumRouter.get('/albums/', readAllAlbums);
albumRouter.get('/albums/:id', readAlbumById);

module.exports = albumRouter;
