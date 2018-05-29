const router = require('koa-better-router')().loadMethods()
const controller = requireController(__filename)

router.get('/', controller.get)

module.exports = router
