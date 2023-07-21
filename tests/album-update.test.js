const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const { describe, it, beforeEach } = require('mocha');

describe('UPDATE /albums/{id}', () => {
  let artists;
  let albums;
  let album;
  beforeEach(async () => {
    const responses = await Promise.all([
      db.query(
        'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
        ['The Beatles', '60s']
      ),
      db.query(
        'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
        ['Radiohead', 'Indie Rock']
      ),
    ]);
    artists = responses.map(({ rows }) => rows[0]);

    const albumData = await Promise.all([
      db.query(
        'INSERT INTO Albums (title, releaseYear, artistId) VALUES( $1, $2, $3) RETURNING *',
        ['Sargent Peppers Lonely Hearts Club Band', 1967, artists[0].id]
      ),
      db.query(
        'INSERT INTO Albums (title, releaseYear, artistId) VALUES( $1, $2, $3) RETURNING *',
        ['Rubber Soul', 1965, artists[0].id]
      ),
      db.query(
        'INSERT INTO Albums (title, releaseYear, artistId) VALUES( $1, $2, $3) RETURNING *',
        ['The White Album', 1968, artists[0].id]
      ),
      db.query(
        'INSERT INTO Albums (title, releaseYear, artistId) VALUES( $1, $2, $3) RETURNING *',
        ['OK Computer', 1997, artists[1].id]
      ),
    ]);
    albums = albumData.map(({ rows }) => rows[0]);
  });
  describe('PATCH /album/{id}', () => {
    it('updates all fields and returns the album', async () => {
      album = albums[0];
      console.log(album);
      console.log(album.id);
      const { status, body } = await request(app)
        .patch(`/album/${album.id}`)
        .send({ title: 'Rubber Soul', releaseYear: 1965, artistId: 2 });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: 'Rubber Soul',
        releaseYear: 1965,
        artistId: 2,
      });
    });

    it('updates partial fields and returns the album', async () => {
      const { status, body } = await request(app)
        .patch(`/album/${album.id}`)
        .send({ title: "Sargent Pepper's Lonely Hearts Club Band" });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        name: "Sargent Pepper's Lonely Hearts Club Band",
        releaseYear: 1967,
        artistId: artist.id,
      });
    });

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/album/999999999')
        .send({ title: 'something different', releaseYear: 2023 });

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});
