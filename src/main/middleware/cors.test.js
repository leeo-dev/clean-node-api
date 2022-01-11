const { describe, test, expect } = require('@jest/globals')
const request = require('supertest')
const app = require('../config/app')

describe('CORS Middleware', () => {
  test('should enable CORS ', async () => {
    app.get('/test_cors', (request, response) => {
      response.send('')
    })
    const response = await request(app).get('/test_x_powered_by')
    expect(response.headers['access-control-allow-origin']).toBe('*')
    expect(response.headers['access-control-allow-method']).toBe('*')
    expect(response.headers['access-control-allow-headers']).toBe('*')
  })
})
