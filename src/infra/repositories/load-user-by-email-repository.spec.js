const { describe, test, expect } = require('@jest/globals')
const { MongoClient } = require('mongodb')

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne({ email })
    return user
  }
}

describe('LoadUserByEmail Repository', () => {
  let client
  let db

  beforeAll(async () => {
    client = new MongoClient(global.__MONGO_URI__)
    await client.connect()
    db = client.db(global.__MONGO_DB_NAME__)
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })
  afterAll(async () => {
    await client.close()
  })

  test('should return null if no user is found', async () => {
    const userModel = db.collection('users')
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
  test('should return an user if user is found', async () => {
    const userModel = db.collection('users')
    await userModel.insertOne({ email: 'valid_email@mail.com' })
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('valid_email@mail.com')
    expect(user.email).toBe('valid_email@mail.com')
  })
})
