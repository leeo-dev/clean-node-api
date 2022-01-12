jest.mock('jsonwebtoken', () => ({
  token: 'any_token',
  secret: '',
  sign (id, secret) {
    this.id = id
    this.secret = secret
    return this.token
  }
}))

const { expect, describe, test } = require('@jest/globals')
const MissingParamError = require('../errors/missing-param-error')
const jwt = require('jsonwebtoken')
const TokenGenerator = require('./token-generator')
const makeSut = () => {
  return new TokenGenerator('secret')
}

describe('TokenGenerator', () => {
  test('should return null if JWT returns null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })
  test('should return a token if JWT return a token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(token).toBe(jwt.token)
  })
  test('should call JWT with correct values', async () => {
    const sut = makeSut()
    await sut.generate('any_id')
    expect(jwt.id).toBe('any_id')
    expect(jwt.secret).toBe(sut.secret)
  })
  test('should throw if no secret or id are provided', async () => {
    const sut = new TokenGenerator()
    const promise = sut.generate('any_id')
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })
  test('should throw if no id or id are provided', async () => {
    const sut = makeSut()
    const promise = sut.generate()
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})
