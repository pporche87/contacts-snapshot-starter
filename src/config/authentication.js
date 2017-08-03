const passport = require('passport')
const LocalStrategy = require('passport-local')
const DbUsers = require('../db/users')
const { comparePassword } = require('../utils/password')

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: true
},
function(request, email, password, done) {
  return DbUsers.checkUserByEmail(email).then(user => {
    user = user[0]
    if (!user) {
      return done(null, false)
    }
    return comparePassword(password, user.password).then(bool => {
      if(!bool) {
        return done(null, false)
      }
      return done(null, user)
    })
  })
    .catch(error => error)
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  DbUsers.checkUserById(id)
    .then(user => {

      done(null, user)
    })
})

module.exports = passport
