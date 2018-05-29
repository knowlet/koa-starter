const router = require('koa-better-router')().loadMethods()
const controller = requireController(__filename)
const auth = require('../helpers/userAuth')

router.get('/dashboard', auth, controller.get)

module.exports = router
