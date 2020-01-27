/* eslint-disable consistent-return */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import announcements from '../data/announcements';

const { should } = chai;

should();
chai.use(chaiHttp);

describe('Create a new announcement', () => {
  describe('POST /announcement', () => {

    const defaultUserCredential = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RfbmFtZSI6IlNhbSIsImxhc3RfbmFtZSI6IlNtaXRoIiwiZW1haWwiOiJzYW1zbWl0aEBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiIwNzg0NDQ2MzUyIiwiYWRkcmVzcyI6IktpZ2FsaSIsInBhc3N3b3JkIjoiJDJhJDEwJE5EcE4uVWl5ODNDTk9iMWdmbkhNNmVPUUNDbjA2a21EVHgwOHhnQTNoRjdJbTBZQURDQ20uIiwiaXNfYWRtaW4iOmZhbHNlLCJpc19ibGFjbGlzdGVkIjpmYWxzZSwiaWF0IjoxNTgwMTU3OTc0fQ.B-MZI4D1VVzI8bR7ppR3IRzLE99cz3GTo313W4d42I8'
    }

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
        .set('authorization', defaultUserCredential.token)
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
        .set('authorization', defaultUserCredential.token)
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