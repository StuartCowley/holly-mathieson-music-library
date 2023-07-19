const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const { describe, it, beforeEach } = require('mocha');

describe('create album', () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES($1, $2) RETURNING *',
      ['The Beatles', '60s']
    );

    artist = rows[0];
  });
  beforeEach(async () => {
    const {
      rows: [album],
    } = await db.query(
      'INSERT INTO Albums (title, releaseYear, artistId) VALUES ($1, $2, $3) RETURNING *',
      [title, releaseYear, artistId]
    );
    res.status(201).json(album);

    describe('DELETE /albums/{id}', () => {
      it('deletes an album in the database and returns the deleted data', async () => {
        const { status, body } = await request(app).delete(`/album`).send();
        expect(status).to.equal(200);
        expect(body.title).to.equal('Sargent Peppers Lonely Hearts Club Band');
        expect(body.releaseYear).to.equal(1967);

        it('returns a 404 if the artist does not exist', async () => {
          const { status, body } = await request(app)
            .delete('/albums/9999999999')
            .send();

          expect(status).to.equal(404);
          expect(body.message).to.equal('album 9999999999 does not exist');
        });
      });
    });
  });
});
