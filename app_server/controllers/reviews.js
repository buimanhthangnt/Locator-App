let services = require('../services');
let db = require('../db');

module.exports.addReview = function (req, res) {
	let location_id = req.params.locationid;
	db.connect()
	.then(() => {
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