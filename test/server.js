var app = require('../')
var fs = require('fs')
var os = require('os')
var path = require('path')
var rimraf = require('rimraf')

module.exports = function (test) {
  var prefix = path.join(os.tmpdir(), 'rxnda')
  fs.mkdtemp(prefix, function (error, directory) {
    if (error) throw error
    app.set('directory', directory)
    app.set('site', 'http://localhost')
    var server = app.listen(0, function () {
      var port = server.address().port
      test(port, function () {
        server.close(function () {
          rimraf.sync(directory)
        })
      })
    })
  })
}
