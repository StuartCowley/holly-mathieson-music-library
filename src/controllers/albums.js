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

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const { title, releaseYear, artistid } = req.body;

  let query, params;

  if (title && releaseYear && artistid) {
    query = `UPDATE Albums SET title = $1, releaseYear = $2, artistId = $3 WHERE id = $4 RETURNING *`;
    params = [title, releaseYear, artistid, id];
  } else if (title && releaseYear) {
    query = `UPDATE Albums SET title = $1, releaseYear = $2 WHERE id = $3 RETURNING *`;
    params = [title, releaseYear, id];
  } else if (releaseYear && artistid) {
    query = `UPDATE Albums SET releaseYear = $1, artistId = $2 WHERE id = $3 RETURNING *`;
    params = [releaseYear, artistid, id];
  } else if (title) {
    query = `UPDATE Albums SET title = $1 WHERE id = $2 RETURNING *`;
    params = [title, id];
  } else if (releaseYear) {
    query = `UPDATE Albums SET releaseYear = $1 WHERE id = $2 RETURNING *`;
    params = [releaseYear, id];
  } else if (artistId) {
    query = `UPDATE Albums SET artistId = $1 WHERE id = $2 RETURNING *`;
    params = [artistId, id];
  }

  try {
    const {
      rows: [album],
    } = await db.query(query, params);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

module.exports = {
  createAlbum,
  readAllAlbums,
  readAlbumById,
  deleteAlbum,
  updateAlbum,
};
