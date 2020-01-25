/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const {
  userExistsMessage,
  signupInstead,
  incorrectCredentials
} = require('../helpers/response-messages');

const { should } = chai;

chai.use(chaiHttp);

should();

/* global describe, it */
describe('Logging user in', () => {
  describe('POST auth/signin', () => {
    const userData = {
      email: 'samsmith@gmail.com',
      password: 'mypassword'
    };

    const inexistingAccount = {
      email: 'blackberry@gmail.com',
      password: 'hispassword'
    };

    const wrongData = {
      email: 'samsmith@gmail.com'
    };

    const wrongPassword = {
      email: 'samsmith@gmail.com',
      password: 'anotherpassword'
    };

    it('should return status 201 and a data object containing basic user information', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(userData)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'data']);
          res.body.data.should.include.keys([
            'token',
            'id',
            'first_name',
            'last_name',
            'email'
          ]);
        });
      done();
    });

    it('should return a message when the signin data are incomplete or wrong', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(wrongData)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'error']);
          res.body.status.should.be.a('string');
          res.body.status.should.equal('error');
          res.body.error.should.be.a('string');
        });
      done();
    });

    it('should send an error message, if a user does not exist', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(inexistingAccount)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.status.should.be.a('string');
          res.body.error.should.be.a('string');
          res.body.status.should.equal(signupInstead.status);
          res.body.error.should.equal(signupInstead.error);
        });
      done();
    });

    it('should send an error message, when the passwords do not match', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(wrongPassword)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.status.should.be.a('string');
          res.body.error.should.be.a('string');
          res.body.status.should.equal(incorrectCredentials.status);
          res.body.error.should.equal(incorrectCredentials.error);
        });
      done();
    });
  });
});
