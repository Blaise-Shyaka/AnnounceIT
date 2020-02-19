/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {
  signupInstead,
  incorrectCredentials
} from '../helpers/response-messages';
import pool from '../data/config';

const { should } = chai;

chai.use(chaiHttp);

should();

/* global describe, it */
describe('Logging a user in with persistent data', () => {
  describe('POST auth/signin', () => {
    const userData = {
      email: 'calumchambers@gmail.com',
      password: 'calumpassword'
    };

    const inexistingAccount = {
      email: 'blackberry@gmail.com',
      password: 'hispassword'
    };

    const wrongData = {
      email: 'samsmith@gmail.com'
    };

    const wrongPassword = {
      email: 'calumchambers@gmail.com',
      password: 'anotherpassword'
    };

    const data = {
      first_name: 'Calum',
      last_name: 'Chambers',
      email: 'calumchambers@gmail.com',
      phone_number: '0786436333',
      address: 'New York',
      password: 'calumpassword',
      confirm_password: 'calumpassword'
    };

    // eslint-disable-next-line no-undef
    before(done => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send(data)
        .end((err, res) => {
          if (err) return done(err);
        });

      done();
    });

    it('should return status 200 and a data object containing basic user information', done => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(userData)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(200);
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
        .post('/api/v2/auth/signin')
        .send(wrongData)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'error']);
          res.body.status.should.be.a('number');
          res.body.status.should.equal(400);
          res.body.error.should.be.a('string');
        });
      done();
    });

    it('should send an error message, if a user does not exist', done => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(inexistingAccount)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.error.should.be.a('number');
          res.body.message.should.be.a('string');
          res.body.error.should.equal(401);
          res.body.message.should.equal(signupInstead);
        });
      done();
    });

    it('should send an error message, when the passwords do not match', done => {
      chai
        .request(app)
        .post('/api/v2/auth/signin')
        .send(wrongPassword)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.error.should.be.a('number');
          res.body.message.should.be.a('string');
          res.body.error.should.equal(401);
          res.body.message.should.equal(incorrectCredentials);
        });
      done();
    });
  });
});
