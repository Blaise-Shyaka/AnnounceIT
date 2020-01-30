import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import generateToken from '../helpers/generate-token';
import {
  deletedSuccessfully,
  resourceNotFound,
  accessDenied
} from '../helpers/response-messages';

const { should } = chai;

should();

chai.use(chaiHttp);

/* global describe, it */
describe('Delete an announcement', () => {
  describe('DELETE /announcement/:id', () => {
    const adminData = {
      id: 2,
      email: 'johnsmith@gmail.com',
      password: 'adminpassword',
      is_admin: true
    };

    const randomData = {
      email: 'samsmith@gmail.com',
      password: 'mypassword'
    };

    const adminToken = generateToken(adminData);
    const wrongToken = 'mdalnfalkdfhakhflahflahfl';
    const randomToken = generateToken(randomData);

    it('should return status 200 with an object whose status and message as properties', done => {
      chai
        .request(app)
        .delete('/api/v1/announcement/3')
        .set('authorization', adminToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'message']);
          res.body.status.should.equal(200);
          res.body.message.should.equal(deletedSuccessfully);
        });
      done();
    });

    it('should return status 401, If admin credentials are wrong', done => {
      chai
        .request(app)
        .delete('/api/v1/announcement/3')
        .set('authorization', wrongToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'error']);
          res.body.status.should.equal(401);
          res.body.error.should.be.a('string');
        });
      done();
    });

    it('should return status 404, If the announcement is not found', done => {
      chai
        .request(app)
        .delete('/api/v1/announcement/300')
        .set('authorization', adminToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.include.keys(['error', 'message']);
          res.body.error.should.equal(404);
          res.body.message.should.equal(resourceNotFound);
        });
      done();
    });

    it('should return status 401 and access denied message, if the user deleting is not an admin', done => {
      chai
        .request(app)
        .delete('/api/v1/announcement/3')
        .set('authorization', randomToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'error']);
          res.body.status.should.equal(401);
          res.body.error.should.equal(accessDenied);
        });
      done();
    });
  });
});
