const router = require('express').Router();
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts');
const DbUsers = require('../../db/users')
const bcrypt = require('bcrypt')
const passport = require('../../config/auth')

router.get('/signup', (request, response) => {
	response.render('signup')
})

router.post('/signup', (request, response, next) => {
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(request.body.password, salt)

	const credentials = {
		'name': request.body.name,
		'email': request.body.email,
		'password': hash
	}

	DbUsers.createUser(credentials)
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


router.get('/', (request, response) => {
	DbContacts.getContacts()
	.then((contacts) => {response.render('index', { contacts })})
	.catch( err => console.log('err', err) )
})

router.use('/contacts', contacts); // /contacts/search
// router.use('/auth', auth) // /auth/signup ...

module.exports = router;
