const express = require('express');
const {
  readAllAlbums,
  readAlbumById,
  deleteAlbum,
} = require('../controllers/albums');
const albumRouter = express.Router();

albumRouter.get('/albums/', readAllAlbums);
albumRouter.get('/albums/:id', readAlbumById);
albumRouter.delete('/albums/:id', deleteAlbum);

module.exports = albumRouter;
