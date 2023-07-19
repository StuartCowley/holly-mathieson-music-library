// might need to redo these

const db = require('../db/index');

const createAlbum = async (req, res) => {
  res.status(201).json({ message: `we are communicating` });
};

const readAllAlbums = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while finding albums.' });
  }
};

const readAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [album],
    } = await db.query('SELECT * FROM albums WHERE id = $1', [id]);
    if (!album) {
      return res.status(404).json({ message: `album does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createAlbum, readAllAlbums, readAlbumById };
