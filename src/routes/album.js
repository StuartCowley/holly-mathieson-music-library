const express = require('express');
const { readAllAlbums, readAlbumById } = require('../controllers/albums');
const albumRouter = express.Router();

albumRouter.get('/albums/', readAllAlbums);
albumRouter.get('/albums/:id', readAlbumById);

module.exports = albumRouter;
