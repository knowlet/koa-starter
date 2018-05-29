const router = require('koa-better-router')().loadMethods()
const controller = requireController(__filename)

router.get('/login', controller.get)
router.post('/login', controller.post)

module.exports = router
