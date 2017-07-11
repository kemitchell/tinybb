var passport = require('passport')
var cookieParser = require('cookie-parser')
var expressSession = require('express-session')
var connectFlash = require('connect-flash')

var app = module.exports = require('express')()

app.use(require('./logger'))
// For flash:
app.use(cookieParser('secret'))
app.use(expressSession({cookie: {maxAge: 60000}}))
app.use(connectFlash())

app.get('/', function (request, response) {
  response.end()
})

app.get('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
