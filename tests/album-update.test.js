const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const { describe, it, beforeEach } = require('mocha');

describe('UPDATE /albums/{id}', () => {
  let artist;
  let album;
  beforeEach(async () => {
    const { rows: artistRows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES ($1, $2) RETURNING *',
      ['The Beatles', '60s']
    );

    artist = artistRows[0];

    const { rows: albumRows } = await db.query(
      'INSERT INTO Albums (title, releaseYear, artistId) VALUES ($1, $2, $3) RETURNING *',
      ['Sargent Peppers Lonely Hearts Club Band', 1967, artist.id]
    );

    album = albumRows[0];
  });
  describe('PATCH /albums/{id}', () => {
    it('updates all fields and returns the album', async () => {
      console.log(`${album.title}: id number ${album.id}`);
      console.log(`${artist.name}: id number ${artist.id}`);
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ title: 'Rubber Soul', releaseYear: 1965 });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        title: 'Rubber Soul',
        releaseyear: 1965,
        artistid: artist.id,
      });
    });

    it('updates partial fields and returns the album', async () => {
      const { status, body } = await request(app)
        .patch(`/albums/${album.id}`)
        .send({ title: "Sargent Pepper's Lonely Hearts Club Band" });

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        id: album.id,
        title: "Sargent Pepper's Lonely Hearts Club Band",
        releaseyear: 1967,
        artistid: artist.id,
      });
    });

    it('returns a 404 if the artist does not exist', async () => {
      const { status, body } = await request(app)
        .patch('/albums/999999999')
        .send({ title: 'something different', releaseYear: 2023 });

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});
