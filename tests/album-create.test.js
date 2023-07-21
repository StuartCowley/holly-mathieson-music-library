const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const { describe, it, before } = require('mocha');

describe('POST /albums/{id}', () => {
  let beatles;
  before(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
      ['The Beatles', '60s']
    );
    beatles = rows[0];
    console.log(beatles);
    console.log(beatles.id);
  });

  describe('POST /artists/{id}/albums', () => {
    it('adds an album to the database', async () => {
      const { status, body } = await request(app)
        .post(`/artists/${beatles.id}/albums`)
        .send({
          title: 'Sargent Peppers Lonely Hearts Club Band',
          releaseYear: 1967,
        });

      expect(status).to.equal(201);
      expect(status).not.to.equal(300);
      expect(body.title).to.equal('Sargent Peppers Lonely Hearts Club Band');
    });
  });
});
