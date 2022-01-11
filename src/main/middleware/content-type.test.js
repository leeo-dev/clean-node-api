const { describe, test } = require('@jest/globals')
const request = require('supertest')
const app = require('../config/app')

describe('Content Type Middleware', () => {
  test('should return content type as default', async () => {
    app.get('/test_content_type', (request, response) => {
      response.send('')
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
