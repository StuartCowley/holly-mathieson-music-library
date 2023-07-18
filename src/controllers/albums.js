const db = require('../db/index');

const createAlbum = async (req, res) => {
  const { artistId } = req.params;
  const { title, releaseYear } = req.body;

  try {
    const {
      rows: [album],
    } = await db.query(
      `INSERT INTO Albums (title, releaseYear, artistId) VALUES ($1, $2, $3) RETURNING *`,
      [title, releaseYear, artistId]
    );
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAllAlbums = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while finding albums.' });
  }
};

module.exports = { createAlbum, getAllAlbums };
