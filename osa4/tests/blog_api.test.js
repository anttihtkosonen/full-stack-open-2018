const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs posted', async () => {
    jest.setTimeout(30000)
    const response = await api

  })
  

afterAll(() => {
  server.close()
})