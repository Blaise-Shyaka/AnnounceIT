/* eslint-disable consistent-return */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const users = require('../data/users');

const { should } = chai;

should();
chai.use(chaiHttp);

/* global describe, it, beforeEach */
describe('Create an account', () => {
  describe('POST /auth/signup', () => {
    beforeEach(() => {
      users.pop();
    });

    const user = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'janedoe@gmail.com',
      phone_number: '0786436352',
      address: 'Kigali',
      password: 'mypassword',
      confirm_password: 'mypassword'
    };

    const incompleteUserInput = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'janedoe@gmail.com'
    };

    const existingUser = {
      first_name: 'Sam',
      last_name: 'Smith',
      email: 'samsmith@gmail.com',
      phone_number: '0784446352',
      address: 'Kigali',
      password: 'mypassword',
      confirm_password: 'mypassword'
    };

    it('On success, it should return status 201 alongside data property with new user info', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.be.equal(201);
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.include.keys([
            'first_name',
            'last_name',
            'email',
            'address',
            'phone_number',
            'password'
          ]);
        });
      done();
    });

    it('should return an error when the data sent by user are incomplete or wrong', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(incompleteUserInput)
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

    it('should send an error message, if a user already exists', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(existingUser)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'error']);
          res.body.status.should.be.a('string');
          res.body.status.should.equal('error');
          res.body.error.should.be.a('string');
          res.body.error.should.equal(
            'The account already exists. Proceed with sign in instead'
          );
        });
      done();
    });
  });
});
