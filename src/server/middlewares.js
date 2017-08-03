const isLoggedIn = (request, response, next) => {
  if (!request.user) {
    response.redirect('/auth/login')
  } else {
    response.locals.isLoggedIn = true
    next()
  }
}

const userIsAdmin = (request, response, next) => {
  if (request.user[0].role === 'admin') {
    response.locals.isAdmin = true
    next()
  } else {
    response.locals.isAdmin = false
    next()
  }
}

module.exports = {
  isLoggedIn,
  userIsAdmin
}
