let db = require('../db');

let sendJsonResponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.locationsStudy = function(req, res) {
	db.connect().then((connection) => {
		connection.query('SELECT * FROM users', (err, results, fields) => {
			if (err) sendJsonResponse(res, 200, {status: err});
			else sendJsonResponse(res, 200, results);
		});
	})
}

module.exports.locationList = function (req, res) {
	// let sql = "SELECT * FROM locations where type = 'study'";
	let sql = "select distinct * from locations inner join keywords on keywords.location_id = locations.id where type = 'study'";
	db.connect().then((connection) => {
		connection.query(sql, (err, results, fields) => {
			if (err) throw err;
			else sendJsonResponse(res, 200, results);
		});
	});
}

module.exports.addLocation = function (req, res) {
	let sql = "INSERT INTO locations (name, type, address, rating, longitude, latitude, discount) VALUES ?"
	let values = [];
	for (let value in req.body) {
		if (value == 'keywords' || value == 'openingTimes') continue;
		values.push(req.body[value]);
	}
	db.connect().then((connection) => {
		connection.query(sql, [[values]], (err, results, fields) => {
			if (err) sendJsonResponse(res, 400, {err: true, msg: err});
			else {
				let location_id = results.insertId;
				let sql2 = "INSERT INTO keywords (keyword, location_id) VALUES ?";
				let values2 = [];
				if (!req.body.keywords || !Array.isArray(req.body.keywords)) {
					sendJsonResponse(res, 400, {err: true, msg: 'keywords is not array'});
					return;
				}
				req.body.keywords.forEach((keyword) => {
					let value2 = [keyword, location_id];
					values2.push(value2);
				});
				connection.query(sql2, [values2], (err2, results2, fields2) => {
					if (err2) sendJsonResponse(res, 400, {err: true, msg: err2});
					else {
						let sql3 = "INSERT INTO opening_times (day, state, open, close, location_id) VALUES ?";
						let values3 = [];
						if (!req.body.openingTimes || !Array.isArray(req.body.openingTimes)) {
							sendJsonResponse(res, 400, {err: true, msg: 'openingTimes is not array'});
							return;
						}
						req.body.openingTimes.forEach((openingTime) => {
							let value3 = [openingTime.day, openingTime.state, openingTime.open, openingTime.close, location_id];
							values3.push(value3);
						});
						connection.query(sql3, [values3], (err3, results3, fields3) => {
							if (err3) sendJsonResponse(res, 400, {err: true, msg: err3});
							else sendJsonResponse(res, 200, {err: false, msg: 'Location has just added'});
						});
					}
				});
			}
		});
	});
}
