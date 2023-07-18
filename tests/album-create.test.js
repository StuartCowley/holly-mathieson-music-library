const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const { describe, it, beforeEach } = require('mocha');

describe('create album', () => {
  let artist;
  beforeEach(async () => {
    const rows = await db.query(
      'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
      ['The Beatles', '60s']
    );
    artist = rows[0];
  });
  describe('/artists/{id}/albums', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const { status, body } = await request(app)
          .post(`/artists/${artist.id}/albums`)
          .send({
            title: 'Rubber Soul',
            releaseYear: 1965,
          });

        expect(status).to.equal(201);
        expect(body.title).to.equal('Rubber Soul');
        expect(body.releaseYear).to.equal(1965);

        const {
          rows: [albumData],
        } = await db.query(
          `SELECT * FROM Albums WHERE artistId = ${artist.id}`
        );
        expect(albumData.title).to.equal('Rubber Soul');
        expect(albumData.releaseYear).to.equal(1965);
        expect(albumData.artistId).to.equal(artist.id);
      });
    });
  });
});
