let db = require('../db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').load();

var sendJsonResponse = function (res, status, content) {
	res.status(status);
	res.json(content);
};

function generateHash(password) {
	let hash = {};
	hash.salt = crypto.randomBytes(16).toString('hex');
	hash.password = crypto.pbkdf2Sync(password, hash.salt, 1000, 64).toString('hex');
	return hash;
}

function generateJwt(email, name) {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		email: email,
		name: name,
		exp: parseInt(expiry.getTime() / 1000)
	// }, process.env.JWT_SECRET);
	}, "thisIsHardcode");
}

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
				let hash = generateHash(password);
				let sql = `INSERT INTO users (email, name, password, salt) VALUES ("${email}", "${name}", "${hash.password}", "${hash.salt}")`;
				return db.insert(sql);
			} else throw new Error('Email existed already');
		})
		.then(results => {
			sendJsonResponse(res, 200, { err: false, msg: "Successful registration!" });
		})
		.catch(err => {
			console.error(err);
			sendJsonResponse(res, 400, { err: true, msg: "" + err });
		})
}

module.exports.login = (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	if (!email || !password) {
		sendJsonResponse(res, 400, { err: true, msg: 'All fields required' });
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
			let hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64).toString('hex');
			if (user.password != hash) throw new Error('Incorrect password');
			let token = generateJwt(email, password);
			sendJsonResponse(res, 200, { err: false, msg: 'Login successfully', data: { jwt: token } });
		})
		.catch(err => {
			console.error(err);
			sendJsonResponse(res, 400, { err: true, msg: "" + err });
		})
}