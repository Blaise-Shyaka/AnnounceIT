/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { userExistsMessage } from '../helpers/response-messages';
import pool from '../data/config';

const { should } = chai;

should();
chai.use(chaiHttp);

/* global describe, it, beforeEach */
describe('Create an account with persistent data', () => {
  describe('POST /auth/signup', async () => {
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

    const client = await pool.connect();
    const existingUser = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [user.email]
    );
    client.release();

    it('On success, it should return status 201 alongside data property with new user info', done => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
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
          res.body.data.first_name.should.equal(user.first_name);
          res.body.data.last_name.should.equal(user.last_name);
          res.body.data.email.should.equal(user.email);
          res.body.data.address.should.equal(user.address);
          res.body.data.phone_number.should.equal(user.phone_number);
        });
      done();
    });

    it('should return an error when the data sent by user are incomplete or wrong', done => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send(incompleteUserInput)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'error']);
          res.body.status.should.equal(400);
          res.body.error.should.be.a('string');
        });
      done();
    });

    it('should send an error message, if a user already exists', done => {
      chai
        .request(app)
        .post('/api/v2/auth/signup')
        .send(existingUser.rows[0])
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');
          res.body.error.should.equal(400);
          res.body.message.should.equal(userExistsMessage);
        });
      done();
    });
  });
});
