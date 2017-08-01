const isLoggedIn = (request, response, next) => {
	if (!request.user) {
		response.redirect('/login')
	} else {
		response.locals.isLoggedIn = true
		next()
	}
}

module.exports = isLoggedIn
