/* eslint-disable consistent-return */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const announcements = require('../data/announcements');

const { should } = chai;

should();
chai.use(chaiHttp);

/* global describe, it, beforeEach */
describe('Create announcement', () => {
  describe('POST /announcement', () => {
    beforeEach(() => {
      announcements.pop();
    });

    const announcement = {
      text: 'lorem ipsum dolor sit amet',
      start_date: '12-09-2019',
      end_date: '02-02-2020'
    };

    it('should return status 201', done => {
      chai
        .request(app)
        .post('/api/v1/announcement')
        .send(announcement)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(201);
        });
      done();
    });

    it('should return an object', done => {
      chai
        .request(app)
        .post('/api/v1/announcement')
        .send(announcement)
        .end((err, res) => {
          if (err) return done(err);

          res.body.should.be.a('object');
        });
      done();
    });

    it('should return an object with status and data as keys', done => {
      chai
        .request(app)
        .post('/api/v1/announcement')
        .send(announcement)
        .end((err, res) => {
          if (err) return done(err);

          res.body.should.include.keys(['status', 'data']);
        });
      done();
    });

    it('The data property should at least have 6 keys', done => {
      chai
        .request(app)
        .post('/api/v1/announcement')
        .send(announcement)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.include.keys([
            'id',
            'owner',
            'status',
            'text',
            'start_date',
            'end-date'
          ]);
        });
      done();
    });
  });
});
