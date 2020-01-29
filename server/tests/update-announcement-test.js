import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import generateToken from '../helpers/generate-token';
import { resourceNotFound } from '../helpers/response-messages';

const { should } = chai;

should();

chai.use(chaiHttp);

/* globals describe, it */
describe('Update an announcement', () => {
  describe('PATCH /announcement/:id', () => {
    const data = {
      id: 1,
      email: 'samsmith@gmail.com',
      password: 'mypassword'
    };

    const defaultUserCredential = generateToken(data);

    const newAnnouncement = {
      text: 'Lorem ipsum dolor sit amet, lorem lorem.',
      start_date: '2020-02-02',
      end_date: '2020-02-25'
    };

    const invalidAnnouncement = {
      text: 'Lorem ipsum dolor sit amet'
    };

    const incorrectCredential = {
      token: 'ashfldkhhkdfahdkhflkahdfjlhlkdhfalsd'
    };

    it('should return status 201 and an object with properties status and data', done => {
      chai
        .request(app)
        .patch('/api/v1/announcement/1')
        .set('authorization', defaultUserCredential)
        .send(newAnnouncement)
        .end((err, res) => {
          console.log(res.body);
          if (err) return done(err);
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'data']);
          res.body.status.should.be.a('number');
          res.body.status.should.equal(201);
          res.body.data.should.be.a('object');
          res.body.data.should.include.keys([
            'id',
            'owner',
            'status',
            'text',
            'start_date',
            'end_date'
          ]);
        });
      done();
    });

    it('Should return a validation error on wrong input', done => {
      chai
        .request(app)
        .patch('/api/v1/announcement/2')
        .set('authorization', defaultUserCredential)
        .send(invalidAnnouncement)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.include.keys(['error', 'message']);
          res.body.message.should.be.a('string');
        });
      done();
    });

    it('Should return an error, in case an announcement is not found', done => {
      chai
        .request(app)
        .patch('/api/v1/announcement/200')
        .set('authorization', defaultUserCredential)
        .send(newAnnouncement)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.include.keys(['error', 'message']);
          res.body.message.should.be.a('string');
          res.body.message.should.equal(resourceNotFound);
        });
      done();
    });

    it('Should return an error, if wrong credentials are provided', done => {
      chai
        .request(app)
        .patch('/api/v1/announcement/2')
        .set('authorization', incorrectCredential)
        .send(newAnnouncement)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'error']);
          res.body.error.should.be.a('string');
        });
      done();
    });
  });
});
