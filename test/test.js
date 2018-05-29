const assert = require('assert')
const request = require('supertest')
const { DEFAULT_PASS } = require('../config')

let app = null
// disable log
console.info = () => {}

describe('Koa', function () {
  describe('#require', function () {
    it('should not error', function () {
      const Koa = require('../src/index')
      app = new Koa()
      assert.notEqual(app, null)
    })
  })
  describe('#hello', function () {
    it('should say hello', function () {
      return request(app.callback())
        .get('/')
        .expect(200, 'Hello Koa')
    })
  })
  describe('#public', function () {
    it('should get favicon', function () {
      return request(app.callback())
        .get('/favicon.ico')
        .expect(200)
    })
  })
  setTimeout(function () {
    describe('#login', function () {
      it('should not login successful', function () {
        return request(app.callback())
          .post('/login')
          .type('form')
          .send({ 'username': 'zxczxc', 'password': 'qweasdzxc' })
          .expect(200, /Oops/)
      })
      it('should login successful and get cookie', function () {
        return request(app.callback())
          .post('/login')
          .type('form')
          .send({ 'username': 'admin', 'password': DEFAULT_PASS })
          .expect('Location', '/dashboard')
          .expect('set-cookie', /PHPSESSION/)
      })
    })
    run()
  }, 1234)
})

after(function (done) {
  app.close()
  done()
  // process.exit(0)
})
