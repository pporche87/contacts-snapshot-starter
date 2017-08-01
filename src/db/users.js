const db = require('./db')

const createUser = function(user){
	return db.query(`INSERT INTO users (name, email, password)
		VALUES ($1, $2, $3) RETURNING *`,
		[user.name, user.email, user.password])
		.catch(error => error)
}

const checkUserByEmail = function(email){
	return db.query(`SELECT * FROM users
		WHERE email=$1`, [email])
		.catch(error => error)
}

const checkUserById = function(id){
	return db.query(`SELECT * FROM users
		WHERE id=$1`, [id])
		.catch(error => error)
}

module.exports = {
	createUser,
	checkUserByEmail,
	checkUserById
}
