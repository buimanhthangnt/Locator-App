let services = require('../services');
let db = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').load();

module.exports.addReview = function (req, res) {
	let location_id = req.params.locationid;
	let userJwt = req.get('jwt');
	let id;
	let getUserId = (userJwt) => {
		let payload;
		jwt.verify(userJwt, process.env.JWT_SECRET, (err, decoded) => {
			if (!err) payload = decoded;
		});
		db.connect()
		.then(() => {
				let sql = `SELECT id, name, email FROM users WHERE email = "${payload.email}"`;
				return db.select(sql);
		})
		.then(users => {
			id = users[0].id;

		})
		.catch(err => {
				console.error(err);
				services.sendFailResponse(res, err);
		})
	};
	let user_id = id;
	db.connect()
	.then(() => {
		let created_time = Date.now();
		let sql = "INSERT INTO comments (rating, content, created_time, location_id, user_id) VALUES ?"
		let values = [];
		for (let prop in req.body) {
			values.push(req.body[prop]);
		}
		return db.insert(sql, [[values]]);
	})
	.then(results => {
		services.sendJsonResponse(res, 200, {err: false, msg: "Review added!"});
	})
	.catch(err => {
		console.error(err);
		services.sendJsonResponse(res, 400, {err: true, msg: "" + err});
	});
}
