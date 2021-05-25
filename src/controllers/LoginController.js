const bcrypt = require('bcrypt')
const { User } = require('../models/index')

module.exports = {
  get: async (ctx, next) => {
    ctx.session = null
    return ctx.render('login')
  },
  post: async (ctx, next) => {
    try {
      const username = ctx.request.body.username
      const password = ctx.request.body.password
      if (!username || !password) {
        throw new Error('Username or Password is empty!')
      }
      const user = await User.findOne({ where: { user: username } })

      if (user !== null && bcrypt.compareSync(password, user.pass)) {
        ctx.session.user = user
        ctx.session.save()
        ctx.redirect('/dashboard')
      } else {
        throw (new Error('Wrong Password!'))
      }
    } catch (err) {
      await ctx.render('login', {
        err: err.message
      })
    }
  }
}
