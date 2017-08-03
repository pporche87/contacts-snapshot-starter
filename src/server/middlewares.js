const isLoggedIn = (request, response, next) => {
  if (!request.user) {
    response.redirect('/auth/login')
  } else {
    response.locals.isLoggedIn = true
    next()
  }
}

const userIsAdmin = (user) => {
  if (user.role === 'admin') {
    return true
  } else {
    return false
  }
}

module.exports = {
  isLoggedIn,
  userIsAdmin
}
