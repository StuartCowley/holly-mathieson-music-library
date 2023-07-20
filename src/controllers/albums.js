// might need to redo these

const db = require('../db/index');

const createAlbum = async (req, res) => {
  const { artistId } = req.params;
  const { title, releaseYear } = req.body;

  try {
    const {
      rows: [album],
    } = await db.query(
      'INSERT INTO Albums (title, releaseYear, artistId) VALUES ($1, $2, $3) RETURNING *',
      [title, releaseYear, artistId]
    );
    res.status(201).json(album);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while creating the album.' });
  }
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
    } = await db.query('SELECT * FROM Albums WHERE id = $1', [id]);
    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [album],
    } = await db.query('DELETE FROM Albums WHERE id = $1 RETURNING *', [id]);
    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createAlbum, readAllAlbums, readAlbumById, deleteAlbum };
