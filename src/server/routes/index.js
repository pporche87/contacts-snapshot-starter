const router = require('express').Router();
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts');
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
				return response.redirect(`/login`)
			next()
		})
		.catch( error => renderError(error, response, response) )
	})

router.get('/login', (request, response) => {
	response.render('login')
})

router.post('/login',
	passport.authenticate('local', {
		successRedirect: '/',
		successFailure: '/login'
	}))

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
