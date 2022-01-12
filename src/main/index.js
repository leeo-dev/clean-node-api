const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')
MongoHelper.connect(env.mongoUrl, 'users')
  .then(() => {
    const app = require('./config/app')
    app.listen(3000, () => console.log('Server running on port 3000'))
  })
  .catch(console.error)
