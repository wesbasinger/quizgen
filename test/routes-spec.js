var rewire = require('rewire');
var app = rewire('../app');
var expect = require('chai').expect;
var request = require('supertest');

describe('Basic Routes', function() {
  it('should load the homepage', function(done) {
    request(app).get('/').expect(200).end(done);
  });
});
