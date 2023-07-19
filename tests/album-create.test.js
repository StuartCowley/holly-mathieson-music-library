const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');
const { describe, it } = require('mocha');

describe('create album', () => {
  describe('/artists/:id/albums', () => {
    describe('POST', () => {
      it('says hello', async () => {
        const { status, body } = await request(app)
          .post('/artists/:id/albums')
          .send({
            name: 'Tame Impala',
            genre: 'rock',
          });

        expect(status).to.equal(201);
        expect(body.message).to.equal('we are communicating');
      });
    });
  });
});
