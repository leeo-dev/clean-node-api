const MongoHelper = require('../infra/helpers/mongo-helper')
const env = require('./config/env')
MongoHelper.connect(env.mongoUrl, 'users')
  .then(() => {
    const app = require('./config/app')
    app.listen(env.PORT, () => console.log(`Server running at http://localhost:${env.PORT}`))
  })
  .catch(console.error)
