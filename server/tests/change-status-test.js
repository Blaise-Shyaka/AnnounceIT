import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import generateToken from '../helpers/generate-token';
import { accessDenied, resourceNotFound } from '../helpers/response-messages';

const { should } = chai;

should();

chai.use(chaiHttp);

/* global describe, it */
describe('Change announcement status by Admin', () => {
  describe('PATCH /announcement/:id/:status', () => {
    const adminData = {
      id: 2,
      email: 'johnsmith@gmail.com',
      password: 'adminpassword',
      is_admin: true
    };

    const wrongAdminData = {
      id: 2,
      email: 'johnsmith@gmail.com',
      password: 'adminpassword',
      is_admin: false
    };

    const adminCredentials = generateToken(adminData);
    const wrongAdminCredentials = generateToken(wrongAdminData);

    const announcementStatus = 'active';
    const sameStatus = 'pending';

    it('should return status 201, and an object with status and data as properties', done => {
      chai
        .request(app)
        .patch(`/api/v1/announcement/1/${announcementStatus}`)
        .set('authorization', adminCredentials)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(200);
          res.body.should.include.keys(['status', 'data']);
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('object');
          res.body.data.should.include.keys([
            'id',
            'owner',
            'text',
            'status',
            'start_date',
            'end_date'
          ]);
          res.body.data.status.should.equal(announcementStatus);
        });
      done();
    });

    it('should return status 401, if the person making a change is not an admin', done => {
      chai
        .request(app)
        .patch(`/api/v1/announcement/1/${announcementStatus}`)
        .set('authorization', wrongAdminCredentials)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(401);
          res.body.should.include.keys(['error', 'message']);
          res.body.error.should.be.a('number');
          res.body.message.should.be.a('string');
          res.body.message.should.equal(accessDenied);
          res.body.error.should.equal(401);
        });
      done();
    });

    it('should return status 404, if the announcement of interest does not exist', done => {
      chai
        .request(app)
        .patch(`/api/v1/announcement/100/${announcementStatus}`)
        .set('authorization', adminCredentials)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(404);
          res.body.should.include.keys(['error', 'message']);
          res.body.error.should.be.a('number');
          res.body.message.should.be.a('string');
          res.body.message.should.equal(resourceNotFound);
          res.body.error.should.equal(404);
        });
      done();
    });

    it('should return status 304, if the current and the former status are similar', done => {
      chai
        .request(app)
        .patch(`/api/v1/announcement/2/${sameStatus}`)
        .set('authorization', adminCredentials)
        .end((err, res) => {
          if (err) return done(err);
          res.status.should.equal(304);
        });
      done();
    });
  });
});
