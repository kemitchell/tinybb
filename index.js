var uuid = require('uuid')

module.exports = function (configuration, request, response) {
  var log = configuration.log
  request.log = log.child({request: uuid.v4()})
  request.log.info(request)
  request.once('finish', function () {
    request.log.info(response)
  })

  response.end()
}
