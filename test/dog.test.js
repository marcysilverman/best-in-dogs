require('dotenv').config();
const connect = require('../lib/utils/connect');	
const mongoose = require('mongoose');
const app = require('../lib/app');
const request = require('supertest');

describe('dog routes', () => {
  beforeAll(() => {
    return connect();
  });

  beforeEach(() => {	
    return mongoose.connection.dropDatabase();	
  });

  afterAll(() => {	
    return mongoose.connection.close();	
  });

  it('creates a new dog', () => {
    return request(app)
      .post('/dogs')
      .send({
        name: 'Chip',
        age: 2,
        weight: 20,
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'Chip', 
          age: '2',
          weight: '20',
          __v: expect.any(Number),
          _id: expect.any(String),
        });
      });
  });
});
