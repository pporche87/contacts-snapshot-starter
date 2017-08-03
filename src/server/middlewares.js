const isLoggedIn = (request, response, next) => {
  if (!request.user) {
    response.redirect('/auth/login')
  } else {
    response.locals.isLoggedIn = true
    next()
  }
}

const userIsAdmin = user => user.role === 'admin'

module.exports = {
  isLoggedIn,
  userIsAdmin
}
