module.exports = (request, response, next) => {
  response.set('access-control-allow-origin', '*')
  response.set('access-control-allow-method', '*')
  response.set('access-control-allow-headers', '*')
  next()
}
