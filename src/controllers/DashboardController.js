module.exports = {
  get: async (ctx, next) => {
    ctx.body = `Hello ${ctx.session.user.name}`
  }
}
