// Write your tests here
const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');


test('sanity', () => {
  expect(true).toBe(true)
})

test('is the correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /register', () => {
  test('no username inserted, error received when registering', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: '', 
      password: 'sneedzy',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })

  test('no password, error received when registering', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'chuck', 
      password: '',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
})
})

describe('[POST] /login', () => {
  test('no username on login', async () => {
    const res = await request(server).post('/login').send({
      username: '', 
      password: 'sneedzy'
    })
    expect(res.status).toBe(404)
  })
  test('no password on login', async () => {
    const res = await request(server).post('/api/auth/login').send({
      username: 'chuck', 
      password: '',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })
  
}) 