var env = process.env
var os = require('os')
var path = require('path')
var pino = require('express-pino-logger')

var PORT = process.env.PORT
  ? parseInt(process.env.PORT)
  : 8080

var log = require('./logger').logger

var app = require('./')

app.disable('x-powered-by')

app.set(
  'directory',
   env.DIRECTORY ? env.DIRECTORY : path.join(process.cwd(), 'tinybb')
)

app.set('site', env.DOMAIN ? env.DOMAIN : os.hostname())

var server = app.listen(PORT, function () {
  log.info({port: server.address().port}, 'listening')
})

process.on('SIGINT', close)
process.on('SIGQUIT', close)
process.on('SIGTERM', close)

process.on('uncaughtException', function (exception) {
  log.error(exception)
  close()
})

function close () {
  log.info('closing')
  server.close(function () {
    log.info('closed')
  })
}
