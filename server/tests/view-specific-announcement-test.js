import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import generateToken from '../helpers/generate-token';
import { resourceNotFound, accessDenied } from '../helpers/response-messages';

const { should } = chai;

should();

chai.use(chaiHttp);

/* global describe, it */
describe('View specific announcement', () => {
  describe('GET /announcement/:id', () => {
    const userData = {
      id: 1,
      email: 'samsmith@gmail.com',
      password: 'mypassword'
    };

    const differentUser = {
      id: 2,
      email: 'johnsmith@gmail.com',
      password: 'adminpassword'
    };

    const userToken = generateToken(userData);
    const differentUserToken = generateToken(differentUser);

    it('should return status 200 and an object with status and data as properties', done => {
      chai
        .request(app)
        .get('/api/v1/announcement/2')
        .set('authorization', userToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.include.keys(['status', 'data']);
          res.body.status.should.be.a('number');
          res.body.data.should.be.a('object');
          res.body.status.should.equal(200);
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

    it('should return a 404 error and an resource not found message', done => {
      chai
        .request(app)
        .get('/api/v1/announcement/21')
        .set('authorization', userToken)
        .end((err, res) => {
          if (err) return done(err);

          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.include.keys(['error', 'message']);
          res.body.error.should.be.a('number');
          res.body.message.should.be.a('string');
          res.body.error.should.equal(404);
          res.body.message.should.equal(resourceNotFound);
        });
      done();
    });
  });
});
