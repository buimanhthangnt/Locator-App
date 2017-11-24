let db = require('../db');
let services = require('../services');
const crypto = require('crypto');

module.exports.register = (req, res) => {
	let name = req.body.name;
	let email = req.body.email;
	let password = req.body.password;
	db.connect()
		.then(() => {
			if (!name || !email || !password) throw new Error('All fields required');
			let sql = `SELECT * FROM users WHERE email = "${email}"`;
			return db.select(sql);
		})
		.then(users => {
			if (Array.isArray(users) && users.length == 0) {
				let hash = services.generateHash(password);
				let sql = `INSERT INTO users (email, name, password, salt) VALUES ("${email}", "${name}", "${hash.password}", "${hash.salt}")`;
				return db.insert(sql);
			} else throw new Error('Email existed already');
		})
		.then(results => {
			services.sendJsonResponse(res, 200, { err: false, msg: "Successful registration!" });
		})
		.catch(err => {
			console.error(err);
			services.sendJsonResponse(res, 400, { err: true, msg: "" + err });
		})
}

module.exports.login = (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	if (!email || !password) {
		services.sendJsonResponse(res, 400, { err: true, msg: 'All fields required' });
		return;
	}
	db.connect()
		.then(() => {
			let sql = `SELECT * FROM users WHERE email = "${email}"`;
			return db.select(sql);
		})
		.then(users => {
			if (!users || users.length == 0) throw new Error('Incorrect email');
			let user = users[0];
			let hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha1').toString('hex');
			if (user.password != hash) throw new Error('Incorrect password');
			let token = services.generateJwt(user.id, email, user.name);
			services.sendJsonResponse(res, 200, { err: false, msg: 'Login successfully', data: { jwt: token } });
		})
		.catch(err => {
			console.error(err);
			services.sendJsonResponse(res, 400, { err: true, msg: "" + err });
		})
}
