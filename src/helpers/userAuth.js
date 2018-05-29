module.exports = async (ctx, next) => {
  ctx.session.isNew ? ctx.redirect('/login') : await next()
}
