const router = require('express').Router();
const contacts = require('./contacts')
const DbContacts = require('../../db/contacts');


router.get('/signup', (request, response) => {
	response.render('signup')
})

router.post('/signup', (request, response) => {

	response.redirect('login')
})

router.get('/login', (request, response) => {
	response.render('login')
})

router.post('/login', (request, response) => {

	// response.redirect()
})

// PASSPORT STUFF

router.get('/', (request, response) => {
	DbContacts.getContacts()
	.then((contacts) => {response.render('index', { contacts })})
	.catch( err => console.log('err', err) )
})

router.use('/contacts', contacts); // /contacts/search
// router.use('/auth', auth) // /auth/signup ...

module.exports = router;
