const express = require('express');
const {
  readAllAlbums,
  readAlbumById,
  deleteAlbum,
  updateAlbum,
} = require('../controllers/albums');
const albumRouter = express.Router();

albumRouter.get('/albums/', readAllAlbums);
albumRouter.get('/albums/:id', readAlbumById);
albumRouter.delete('/albums/:id', deleteAlbum);
albumRouter.patch('/albums/:id', updateAlbum);

module.exports = albumRouter;
