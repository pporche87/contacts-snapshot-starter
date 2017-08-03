const router = require('express').Router()
const contacts = require('./contacts')
const authentication = require('./authentication')
const admin = require('./admin')
const DbContacts = require('../../db/contacts')
const {isLoggedIn, userIsAdmin} = require('../middlewares')

router.use('/auth', authentication)
router.use(isLoggedIn)
router.use(userIsAdmin)
router.use('/contacts', contacts)

router.get('/', (request, response) => {
  DbContacts.getContacts()
    .then((contacts) => {response.render('index', { contacts })})
    .catch( error => error )
})

router.use('/admin', admin)

module.exports = router
