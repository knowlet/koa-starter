const Koa = require('./src/index')
const app = new Koa()
const port = process.env.PORT || 8443

app.listen(port, () => console.log(`Listening on port ${port}!`))
