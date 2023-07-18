const express = require('express');
const { createAlbum, getAllAlbums } = require('../controllers/albums');
const albumRouter = express.Router();

albumRouter.post('/artists/:id/albums', createAlbum);
albumRouter.get('/albums/', getAllAlbums);

module.exports = albumRouter;
