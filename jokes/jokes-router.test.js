const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

beforeEach(async () => {
  return db.migrate.rollback()
    .then(() => db.migrate.latest())
});

test('token required for jokes route', async () => {
  const register = await request(server)
    .post('/api/auth/register')
    .send({username: "devin", password: 'password'})

  const login = await request(server)
    .post('/api/auth/login')
    .send({ username: 'devin', password: 'password'})

  const res = await request(server)
    .get('/api/jokes')
    .set('authorization', login.body.token)

  expect(res.body).toHaveLength(20)
  expect(res.body[0]).toHaveProperty('id')
})