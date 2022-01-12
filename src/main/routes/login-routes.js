const LoginRouterCompose = require('../composers/login-router-composer')
const { adapt } = require('../adapters/express-router-adapter')
module.exports = router => {
  router.post('/login', adapt(LoginRouterCompose.compose()))
}
