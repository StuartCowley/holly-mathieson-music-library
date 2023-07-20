const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const { describe, it, beforeEach } = require('mocha');

// describe('create album', async () => {
//   describe('POST /artists/{id}/albums', () => {
//     let artist;
//     beforeEach(async () => {
//       const { rows } = await db.query(
//         'INSERT INTO Artists (name, genre) VALUES($1, $2) RETURNING *',
//         ['The Beatles', '60s']
//       );

//       artist = rows[0];
//     });

//     it('creates a new album in the database', async () => {
//       const { status, body } = await request(app)
//         .post(`/artists/${artist.id}/albums`)
//         .send({
//           title: 'Sargent Peppers Lonely Hearts Club Band',
//           releaseYear: 1967,
//         });
//       console.log(body);
//       expect(status).to.equal(201);
//       expect(body.title).to.equal('Sargent Peppers Lonely Hearts Club Band');
//       expect(body.releaseYear).to.equal(1967);

//       const {
//         rows: [albumData],
//       } = await db.query(`SELECT * FROM Albums WHERE artistId = ${artist.id}`);
//       expect(albumData.title).to.equal(
//         'Sargent Peppers Lonely Hearts Club Band'
//       );
//       expect(albumData.releaseYear).to.equal(1967);
//       expect(albumData.artistid).to.equal(artist.id);
//     });
//   });
// });
