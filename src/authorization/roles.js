const ALL_USER_ROLES = ['admin', 'viewer']

const CAPABILITY_ROLES = {
	viewContacts: ['admin', 'viewer'],
	viewContact: ['admin', 'viewer'],
	createContact: ['admin'],
	deleteContact: ['admin'],
	newContact: ['admin']
}

module.exports = {
	ALL_USER_ROLES,
	CAPABILITY_ROLES
}
