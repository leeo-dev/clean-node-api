const { MongoClient } = require('mongodb')

module.exports = {

  async connect (uri) {
    this.uri = uri
    this.client = new MongoClient(this.uri)
    await this.client.connect()
    this.db = this.client.db(this.dbName)
  },
  async disconnect () {
    await this.client.close()
    this.client = null
    this.db = null
  },
  async getCollection (name) {
    return this.client.db(this.dbName).collection(name)
  }
}
