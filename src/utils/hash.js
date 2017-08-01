const bcrypt = require('bcrypt')
const saltRounds = 10

const makeHashedPassword = (plainTxtPassword) => {
	return bcrypt.hash(plainTxtPassword, saltRounds)
}

module.exports = makeHashedPassword
