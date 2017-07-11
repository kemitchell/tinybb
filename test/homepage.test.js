var http = require('http')
var server = require('./server')
var tape = require('tape')

tape('GET /', function (test) {
  server(function (port, done) {
    http.get({port: port}, function (response) {
      test.assert(
        response.statusCode, 200,
        'responds 200'
      )
      test.end()
      done()
    })
  })
})
