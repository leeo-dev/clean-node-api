const { describe, test, expect } = require('@jest/globals')
const MongoHelper = require('../helpers/mongo-helper')
const MissingParamError = require('../../utils/errors/missing-param-error')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let db

const makeSut = () => {
  const sut = new LoadUserByEmailRepository()
  return sut
}

describe('LoadUserByEmail Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__, global.__MONGO_DB_NAME__)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should return null if no user is found', async () => {
    const sut = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
  test('should return an user if user is found', async () => {
    const sut = makeSut()
    const fakeUser = await db.collection('users').insertOne({ email: 'valid_email@mail.com', name: 'Leonardo', password: 'hashed_password' })
    const user = await sut.load('valid_email@mail.com')
    expect(user.email).toBe('valid_email@mail.com')
    expect(user._id).toEqual(fakeUser.insertedId)
  })
  test('should throw if no Email is provided', async () => {
    const sut = makeSut()
    const promise = sut.load()
    expect(promise).rejects.toThrow(new MissingParamError('email'))
  })
})
