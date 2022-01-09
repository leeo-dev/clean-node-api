const { MongoClient } = require('mongodb')

describe('insert', () => {
  let client
  let db

  beforeAll(async () => {
    client = new MongoClient(global.__MONGO_URI__)
    await client.connect()
    db = client.db(global.__MONGO_DB_NAME__)
  })

  afterAll(async () => {
    await client.close()
  })

  it('should insert a doc into collection', async () => {
    const users = db.collection('users')

    const mockUser = { _id: 'some-user-id', name: 'John' }
    await users.insertOne(mockUser)

    const insertedUser = await users.findOne({ _id: 'some-user-id' })
    console.log(mockUser)
    expect(insertedUser).toEqual(mockUser)
  })
})
