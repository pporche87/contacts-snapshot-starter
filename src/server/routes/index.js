const router = require('express').Router()
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts')
const User = require('../../models/users')
const bcrypt = require('bcrypt')
const passport = require('../../config/auth')
const {isLoggedIn} = require('../middlewares')

router.get('/signup', (request, response) => {
	response.render('signup')
})

router.post('/signup', (request, response, next) => {
	User.createUser(request.body.name, request.body.email, request.body.password)
	.then(function(contact) {
		if (contact)
			response.render(`login`, {
				message: `Welcome to the Contacts app ${request.body.name}! Please login`,
				success: true
			})
		next()
	})
	.catch( error => renderError(error, response, response) )
})

router.get('/login', (request, response) => {
	response.render('login')
})

router.post('/login', function (request, response, next) {
	passport.authenticate('local', function (error, user, info) {
		if (error) { return next(error) }
		if (!user) { return response.render('login', {
			message: 'email or password does not exist',
			success: false
		}) }
		request.logIn(user, function(error) {
			if (error) { return next(error) }
			return response.redirect('/')
		})
	})(request, response, next)
})

router.get('/logout', (request, response) => {
	request.session.destroy(() => {
		response.redirect('/login')
	})
})

router.get('/', isLoggedIn, (request, response) => {
	DbContacts.getContacts()
	.then((contacts) => {response.render('index', { contacts })})
	.catch( err => console.log('err', err) )
})

router.use('/contacts', isLoggedIn, contacts); // /contacts/search

module.exports = router;
