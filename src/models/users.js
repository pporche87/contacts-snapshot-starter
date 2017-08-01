const DbUsers = require('../db/users')
const makeHashedPassword = require('../utils/hash')

const createUser = (name, email, password) => {
	return makeHashedPassword(password).then(hash => {
		const credentials = {
			'name': name,
			'email': email,
			'password': hash
		}
		return DbUsers.createUser(credentials)
	})
}

module.exports = {createUser}
