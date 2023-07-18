const express = require('express');
const { createAlbum } = require('../controllers/albums');
const albumRouter = express.Router();

albumRouter.post('/artists/:id/albums', createAlbum);

module.exports = albumRouter;
