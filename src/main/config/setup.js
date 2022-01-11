const cors = require('../middleware/cors')
const jsonParser = require('../middleware/json-parse')
module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParser)
}
