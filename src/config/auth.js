const passport = require('passport')
const LocalStrategy = require('passport-local')
const DbUsers = require('../db/users')
const bcrypt = require('bcrypt')
const {renderError} = require('../server/utils')

passport.use('local', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
	session: true
},
function(request, email, password, done) {
	const hash = bcrypt.hashSync(password, 10)
	DbUsers.checkUserByEmail(email)
		.then(user => {
			if (!user) {
				return done(null, false)
			}
			if (!bcrypt.compareSync(password, hash)) {
				return done(null, false)
			}
			return done(null, user[0])
		})
		.catch( error => error)
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
