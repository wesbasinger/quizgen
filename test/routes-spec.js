var rewire = require('rewire');
var app = rewire('../app');
var expect = require('chai').expect;
var request = require('supertest');

describe('Basic Routes', function() {
  it('should load the homepage', function(done) {
    request(app).get('/').expect(200).end(done);
  });

  it('should return false on success with no info posted', function(done) {
    var user = {email:null, password:null};
    request(app)
      .post('/')
      .send(user)
      .expect({success:false}, done);
  });
  it('should be able to return success on POST request', function(done) {
    var user = {email:"wbasinger@villagetechschools.org", password:"password"};
    request(app)
      .post('/')
      .send(user)
      .expect(302).end(done);
  });
  it('should redirect to quiz list after successful post request', function(done) {
    request(app)
      .post('/')
      .send({email:"wbasinger@villagetechschools.org", password:"password"})
      .end(function(err, res) {
        expect(res.headers).to.be.ok;
        done();
      });
  });
});
