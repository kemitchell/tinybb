var app = module.exports = require('express')()

app.use(require('./logger'))

app.get('/', function (request, response) {
  response.end()
})
