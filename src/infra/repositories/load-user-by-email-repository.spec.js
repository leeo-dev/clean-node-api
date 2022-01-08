const { describe, test, expect } = require('@jest/globals')

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = null
    return user
  }
}

describe('LoadUserByEmail Repository', () => {
  test('should return null if no user is found', async () => {
    const userModel = ''
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
})
