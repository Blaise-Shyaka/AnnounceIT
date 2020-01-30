import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import generateToken from '../helpers/generate-token';
import { accessDenied, resourceNotFound } from '../helpers/response-messages';

const { should } = chai;

should();

chai.use(chaiHttp);

/* global describe, it */

describe('Get all announcements of a specific state', () => {
  describe('GET /announcements/:status', () => {
    const userData = {
      id: 1,
      email: 'samsmith@gmail.com',
      password: 'mypassword',
      is_admin: false
    };

    const adminData = {
      id: 2,
      email: 'johnsmith@gmail.com',
      password: 'adminpassword',
      is_admin: true
    };
    const adminToken = generateToken(adminData);
    const userToken = generateToken(userData);

    it('should return status 200 and an object with status and data as properties', done => {
      chai
        .request(app)
        .get('/api/v1/announcements/pending')
        .set('authorization', userToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'data']);
          res.body.status.should.equal(200);
        });
      done();
    });

    it('should return status 401, if announcements are requested by an admin', done => {
      chai
        .request(app)
        .get('/api/v1/announcements/pending')
        .set('authorization', adminToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.include.keys(['error', 'message']);
          res.body.error.should.equal(401);
          res.body.message.should.be.a('string');
          res.body.error.should.be.a('number');
          res.body.message.should.equal(accessDenied);
        });
      done();
    });

    it('should return error 404, if no announcements of that specific status is found', done => {
      chai
        .request(app)
        .get('/api/v1/announcements/deactivated')
        .set('authorization', userToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.include.keys(['error', 'message']);
          res.body.error.should.equal(404);
          res.body.message.should.be.a('string');
          res.body.error.should.be.a('number');
          res.body.message.should.equal(resourceNotFound);
        });
      done();
    });
  });
});
