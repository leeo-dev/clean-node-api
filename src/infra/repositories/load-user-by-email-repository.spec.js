const { describe, test, expect } = require('@jest/globals')
const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let client
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return { sut, userModel }
}

describe('LoadUserByEmail Repository', () => {
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
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
  test('should return an user if user is found', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({ email: 'valid_email@mail.com', name: 'Leonardo', password: 'hashed_password' })
    const user = await sut.load('valid_email@mail.com')
    expect(user.email).toBe('valid_email@mail.com')
    expect(user._id).toEqual(fakeUser.insertedId)
  })
})
