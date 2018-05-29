module.exports = {
  get: async (ctx, next) => {
    ctx.session = null
    return ctx.redirect('login')
  }
}
