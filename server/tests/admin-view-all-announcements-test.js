import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import generateToken from '../helpers/generate-token';

const { should } = chai;

should();

chai.use(chaiHttp);

/* global describe, it */

describe('View all announcements from all users', () => {
  describe('GET /announcement', () => {
    const adminData = {
      id: 2,
      email: 'johnsmith@gmail.com',
      password: 'adminpassword',
      is_admin: true
    };

    const regularUser = {
      id: 1,
      email: 'samsmith@gmail.com',
      password: 'mypassword',
      is_admin: false
    };

    const adminToken = generateToken(adminData);
    const regularUserToken = generateToken(regularUser);

    it('should return status 200 and an object whose status and data properties', done => {
      chai
        .request(app)
        .get('/api/v1/announcement')
        .set('authorization', adminToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'data']);
          res.body.status.should.be.a('number');
          res.body.status.should.equal(200);
          res.body.data.should.be.a('array');
        });
      done();
    });

    it('should return an error 401 and an object whose status and error as properties', done => {
      chai
        .request(app)
        .get('/api/v1/announcement')
        .set('authorization', regularUserToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'error']);
          res.body.status.should.be.a('number');
          res.body.status.should.equal(401);
          res.body.error.should.be.a('string');
        });
      done();
    });
  });
});
