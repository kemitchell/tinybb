var fs = require('fs')

module.exports = require('express-pino-logger')(
  process.env.NODE_ENV === 'test'
    ? fs.createWriteStream('test-server.log')
    : process.stdout
)
