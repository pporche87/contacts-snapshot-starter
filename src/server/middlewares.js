const {ALL_USER_ROLES, CAPABILITY_ROLES} = require('../authorization/roles')

const isLoggedIn = (request, response, next) => {
	if (!request.user) {
		response.redirect('/login')
	} else {
		response.locals.isLoggedIn = true
		next()
	}
}

const userHasAccess = (user, action) => {
	const role = user.role
	const allActions = Object.keys(CAPABILITY_ROLES)
	const isValidRole = ALL_USER_ROLES.includes(role)
	if(!isValidRole) {
		throw new Error(`User with email: ${user.email} does not have a role!`)
	} else if (!allActions.includes(action)){
		throw new Error(`Tried to get permission for an invalid action. Action: ${action}`)
	} else {
		const capabilities = CAPABILITY_ROLES[action]
		return capabilities.includes(user.role)
	}
}

module.exports = {
	isLoggedIn,
	userHasAccess
}
