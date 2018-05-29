const cluster = require('cluster')
const chokidar = require('chokidar')
const fs = require('fs')
const p = require('path')

const watchConfig = {
  dir: [ 'src', 'app.js' ],
  options: {
    ignored: /(^|[/\\])\../,
    persistent: true
  }
}

if (cluster.isMaster) {
  let worker = cluster.fork()
  let isReady = false

  chokidar.watch(watchConfig.dir, watchConfig.options)
    .on('ready', () => (isReady = true))
    .on('add', path => {
      if (isReady && path.startsWith('src/routes')) {
        const filename = `${__dirname}/src/controllers/${p.basename(path, p.extname(path))}Controller.js`
        console.log(filename)
        if (!fs.existsSync(filename)) {
          fs.createReadStream(`${__dirname}/src/controllers/.ExampleController.js`).pipe(fs.createWriteStream(filename))
        }
      }
    })
    .on('change', path => {
      console.log(`${path} changed`)
      if (p.extname(path) !== '.js') return
      worker && worker.kill()
      worker = cluster.fork().on('listening', (address) => {
        console.log(`[master] listening: worker ${worker.id}, pid:${worker.process.pid}`)
      })
    })
}

if (cluster.isWorker) {
  require('./app')
}
