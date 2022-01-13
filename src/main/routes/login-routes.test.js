const { describe, test } = require('@jest/globals')
const request = require('supertest')
const app = require('../config/app')
const MongoHelper = require('../../infra/helpers/mongo-helper')
const bcrypt = require('bcrypt')
let userModel

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__, global.__MONGO_DB_NAME__)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return 200 when valid credential are provided', async () => {
    await userModel.insertOne({ email: 'valid_email@mail.com', password: bcrypt.hashSync('hashed_password', 10) })
    await request(app)
      .post('/api/login')
      .send({ email: 'valid_email@mail.com', password: 'hashed_password' }).expect(200)
  })
  test('Should return 401 when valid credential are provided', async () => {
    await userModel.insertOne({ email: 'valid_email@mail.com', password: bcrypt.hashSync('hashed_password', 10) })
    await request(app)
      .post('/api/login')
      .send({ email: 'valid_email@mail.com', password: 'password' }).expect(401)
  })
})
