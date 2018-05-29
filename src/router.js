const path = require('path')
const router = require('koa-better-router')().loadMethods()
global.requireController = filename => { return require(`./controllers/${path.basename(filename, path.extname(filename))}Controller`) }

require('require-all')({
  dirname: path.resolve(__dirname, 'routes'),
  resolve: Router => router.extend(Router)
})

module.exports = router
