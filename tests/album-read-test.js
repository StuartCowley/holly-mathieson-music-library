const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const { describe, it, beforeEach } = require('mocha');

describe('READ /albums/{id}', () => {
  let artists;
  let albums;
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

  describe('GET /albums', () => {
    it('returns all albums', async () => {
      const { status, body } = await request(app).get('/albums').send();
      expect(status).to.equal(200);
      expect(body.length).to.equal(albums.length);
    });
  });

  describe('GET /albums/{id}', () => {
    it('returns an album in the database with the correct id', async () => {
      const { status, body } = await request(app)
        .get(`/albums/${albums[0].id}`)
        .send();

      expect(status).to.equal(200);
      expect(status).not.to.equal(300);
      expect(body).to.deep.equal(albums[0]);
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app).get('/albums/999999').send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999 does not exist');
    });
  });
});
