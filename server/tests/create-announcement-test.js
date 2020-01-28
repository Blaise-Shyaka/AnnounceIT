/* eslint-disable consistent-return */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import generateToken from '../helpers/generate-token';

const { should } = chai;

should();
chai.use(chaiHttp);

describe('Create a new announcement', () => {
  describe('POST /announcement', () => {

    const data = {
      email: 'samsmith@gmail.com',
      password: 'mypassword'
  }

  const defaultUserCredential = generateToken(data);
  
  const incorrectCredential = {
      token: 'ashfldkhhkdfahdkhflkahdfjlhlkdhfalsd'
    }

    const announcement = {
      text: 'Lorem ipsum dolor sit amet',
      start_date: '2020-01-02',
      end_date: '2020-01-25'
    }

    const invalidAnnouncement = {
      text: 'Lorem ipsum dolor sit amet'
    }

    it('Should return status 201 and an object with data and status properties', done => {
      chai
        .request(app)
        .post('/api/v1/announcement')
        .set('authorization', defaultUserCredential)
        .send(announcement)
        .end((err, res) => {
          if(err) return done(err);
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'data']);
          res.body.data.should.be.a('object');
          res.body.data.text.should.be.a('string');
          res.body.data.start_date.should.be.a('string');
          res.body.data.end_date.should.be.a('string');
        });
      done();
    });

    it('Should return a validation error on wrong input', done => {

      chai
        .request(app)
        .post('/api/v1/announcement')
        .set('authorization', defaultUserCredential)
        .send(invalidAnnouncement)
        .end((err, res) => {
          if(err) return done(err);

          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'error']);
          res.body.error.should.be.a('string');
        });
        done();
    });

    it('should return an authentication error, if the user lacks correct credentials', done => {

      chai
        .request(app)
        .post('/api/v1/announcement')
        .set('authorization', incorrectCredential)
        .send(announcement)
        .end((err, res) => {
          if(err) return done(err);

          res.status.should.equal(401);
        });
      done();
    });
  });
});
