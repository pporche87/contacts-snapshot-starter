// const passport = require('passport')
// const LocalStrategy = require('passport-local')
// const database = require('../../db/db.js')
// const bcrypt = require('bcrypt')

const DbUsers = require('../../db/users')
const {renderError} = require('../utils')

const router = require('express').Router()

// passport.use('login', new LocalStrategy({
// 	usernameField: 'email',
// 	passwordField: 'password',
// 	passReqToCallback: true,
// 	session: true
// },
// (request, email, password, done) => {
// 	database.
// }))



module.exports = router
