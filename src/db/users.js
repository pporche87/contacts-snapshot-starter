const db = require('./db')

const createUser = function(user){
	return db.query(`INSERT INTO users (name, email, password, role)
		VALUES ($1, $2, $3, 'viewer') RETURNING *`,
		[user.name, user.email, user.password])
		.catch(error => error)
}

const updateRole = function(user){
	return db.query(`UPDATE users SET role='admin' WHERE id=$1`, [user.id])
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
	updateRole,
	checkUserByEmail,
	checkUserById
}
