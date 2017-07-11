var handler = require('./')
var http = require('http')
var os = require('os')
var path = require('path')
var pino = require('pino')
var uuid = require('uuid')

var configuration = {
  directory: process.env.DIRECTORY
    ? process.env.DIRECTORY
    : path.join(process.cwd(), 'tinybb'),
  port: process.env.PORT
    ? parseInt(process.env.PORT)
    : 8080,
  domain: process.env.DOMAIN
    ? process.env.DOMAIN
    : os.hostname()
}

var log = configuration.log = pino({server: uuid.v4()})

var server = http.createServer()
  .on('response', function (request, response) {
    handler(configuration, request, response)
  })

server.listen(configuration.port, function () {
  configuration.port = this.address().port
  log.info({port: configuration.port}, 'listening')
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
