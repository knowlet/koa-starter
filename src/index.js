const Koa = require('koa')
const helmet = require('koa-helmet')
const serve = require('koa-static')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')

const http2 = require('http2')
const fs = require('fs')
const { sequelize } = require('./models/index')
const { SSL } = require('../config')

const options = {
  key: fs.readFileSync(SSL.KEY),
  cert: fs.readFileSync(SSL.CERT),
  ca: fs.readFileSync(SSL.CA),
  allowHTTP1: true
}

const logger = async (ctx, next) => {
  const now = (new Date()).toLocaleString()
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.info(`[${now}] ${ctx.method} ${ctx.url} - ${ms}ms`)
}

module.exports = class KoaOnHttps extends Koa {
  constructor () {
    super()
    // response time
    this.use(logger)
    this.use(helmet())
    this.use(serve('public'))
    // Must be used before any router is used
    this.use(views(`${__dirname}/views`, { map: { html: 'ejs' } }))
    this.use(bodyParser())
    // routers
    const router = require('./router')
    this.use(router.middleware())
    // session
    this.keys = ['Taiwan NO.1']
    this.use(session({ key: 'PHPSESSION', signed: false }, this))
  }
  listen () {
    const server = http2.createSecureServer(options, this.callback())
    return server.listen.apply(server, arguments)
  }
  close () {
    sequelize.sync().then(() => { sequelize.close() })
    process.exit(0)
  }
}
