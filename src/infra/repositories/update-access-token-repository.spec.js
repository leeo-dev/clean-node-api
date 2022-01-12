const { describe, test, expect } = require('@jest/globals')
const MongoHelper = require('../helpers/mongo-helper')
const MissingParamError = require('../../utils/errors/missing-param-error')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
let db

const makeSut = () => {
  return new UpdateAccessTokenRepository()
}

describe('LoadUserByEmail Repository', () => {
  let fakeUserId

  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__, global.__MONGO_DB_NAME__)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    const userModel = db.collection('users')
    await userModel.deleteMany()
    const fakeUser = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'Leonardo',
      password: 'hashed_password'
    })
    fakeUserId = fakeUser.insertedId
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should update the user with given access token', async () => {
    const sut = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const updatedFakeUser = await db.collection('users').findOne({ _id: fakeUserId })
    expect(updatedFakeUser.accessToken).toBe('valid_token')
  })
  test('should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(fakeUserId)).rejects.toThrow(new MissingParamError('accessToken'))
  })
})
