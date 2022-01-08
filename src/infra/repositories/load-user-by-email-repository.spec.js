const { describe, test, expect } = require('@jest/globals')

class LoadUserByEmailRepository {
  async load () {
    return null
  }
}

describe('LoadUserByEmail Repository', () => {
  test('should return null if no user is found', async () => {
    const sut = new LoadUserByEmailRepository()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
})
