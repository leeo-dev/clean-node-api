module.exports = class ServerError extends Error {
  constructor () {
    super('An internal Error!')
    this.name = 'ServerError'
  }
}
