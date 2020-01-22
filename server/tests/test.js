/* eslint-disable consistent-return */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const users = require('../data/users');

const { should } = chai;

should();
chai.use(chaiHttp);

/* global describe, it, beforEach */
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

    it('should return status 201', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.be.equal(201);
        });
      done();
    });

    it('should return an object with properties status and data', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);

          res.body.should.have.property('status');
          res.body.should.have.property('data');
        });
      done();
    });

    it('The data property should be an object', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
          res.body.data.should.be.a('object');
        });
      done();
    });

    it('The data property should contain at least 6 properties', done => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          if (err) return done(err);
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
  });
});
