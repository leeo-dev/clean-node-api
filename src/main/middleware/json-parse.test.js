const { describe, test } = require('@jest/globals')
const request = require('supertest')
const app = require('../config/app')

describe('JSON parse Middleware', () => {
  test('should parse body as JSON', async () => {
    app.post('/test_json_parse', (request, response) => {
      response.send(request.body)
    })
    await request(app)
      .post('/test_json_parse')
      .send({ name: 'Oliveira' })
      .expect({ name: 'Oliveira' })
  })
})
