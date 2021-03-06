const { describe, test, expect } = require('@jest/globals')
const request = require('supertest')
const app = require('./app')

describe('Test Setup', () => {
  test('should disable x-powered-by header ', async () => {
    app.get('/test_x_powered_by', (request, response) => {
      response.send('')
    })
    const response = await request(app).get('/test_x_powered_by')
    expect(response.headers['x-powered-by']).toBeUndefined()
  })
})
