const bcrypt = require('bcrypt')
const saltRounds = 10

const makeHashedPassword = (plainTxtPassword) => {
	return bcrypt.hash(plainTxtPassword, saltRounds)
}

const comparePassword = (plainTxtPassword, hash) => {
	console.log(plainTxtPassword)
	console.log(hash);
	return bcrypt.compare(plainTxtPassword, hash)
}

module.exports = {
	makeHashedPassword,
	comparePassword
}
