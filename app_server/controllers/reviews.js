let services = require('../services');
let db = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').load();

module.exports.addReview = function (req, res) {
	let location_id = req.params.locationid;
	let payload;
	services.authorize(req.get('jwt'))
		.then((_payload) => {
			payload = _payload;
			return db.connect();
		})
		.then(() => {
			let created_time = Date.now();
			let sql = "INSERT INTO comments (rating, content, created_time, location_id, user_id) VALUES ?"
			let values = [];
			for (let prop in req.body) {
				values.push(req.body[prop]);
			}
			if (values.length < 2) throw new Error("All fields required");
			values.push(created_time);
			values.push(location_id);
			values.push(payload.id);
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
