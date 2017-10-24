let services = require('../services');
let db = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').load();

module.exports.addReview = function (req, res) {
	let location_id = req.params.locationid;
	services.authorize(res.get('jwt'))
		.then((payload) => {
			let user_id = payload.id;
			db.connect()
			.then(() => {
				let created_time = Date.now();
				let sql = "INSERT INTO comments (rating, content, created_time, location_id, user_id) VALUES ?"
				let values = [];
				for (let prop in req.body) {
					values.push(req.body[prop]);
				}
				values.push(created_time);
				values.push(location_id);
				values.push(user_id);
				return db.insert(sql, [[values]]);
			})
			.then(results => {
				console.log(results);
				services.sendJsonResponse(res, 200, {err: false, msg: "Review added!"});
			})
		})
		.catch(err => {
			console.error(err);
			services.sendJsonResponse(res, 400, {err: true, msg: "" + err});
		});
}
