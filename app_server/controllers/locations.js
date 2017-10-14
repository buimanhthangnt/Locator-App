let db = require('../db');

let sendJsonResponse = function (res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.locationList = function (req, res) {
	let locations;
	db.connect()
		.then(() => {
			let type = req.params.type;
			if (type != 'study' && type != 'work' && type != 'dating') throw new Error("Not found");
			let sql = `SELECT * FROM locations where type = "${type}"`;
			return db.select(sql);
		})
		.then(_locations => {
			locations = _locations;
			let sql = "SELECT * FROM keywords";
			return db.select(sql);
		})
		.then(_keywords => {
			let currentIndex = 0;
			locations.forEach((location) => {
				location.keywords = [];
				for (let i = currentIndex; i < _keywords.length; i++) {
					if (_keywords[i].location_id == location.id) location.keywords.push(_keywords[i].keyword);
					else if (_keywords[i].location_id > location.id) {
						currentIndex = i;
						break;
					}
				}
			});
			let sql = "SELECT * FROM opening_times";
			return db.select(sql);
		})
		.then(_opening_times => {
			let currentIndex = 0;
			locations.forEach((location) => {
				location.openingTimes = [];
				for (let i = currentIndex; i < _opening_times.length; i++) {
					if (_opening_times[i].location_id == location.id) location.openingTimes.push(_opening_times[i]);
					else if (_opening_times[i].location_id > location.id) {
						currentIndex = i;
						break;
					}
				}
			});
			sendJsonResponse(res, 200, {err: false, data: locations, msg: 'Success'});
		})
		.catch(err => {
			console.error(err);
			sendJsonResponse(res, 400, {err: true, msg: 'Fail'});
		});
}

module.exports.addLocation = function (req, res) {
	db.connect()
		.then(() => {
			let sql = "INSERT INTO locations (name, type, address, rating, longitude, latitude, discount) VALUES ?"
			let values = [];
			for (let prop in req.body) {
				if (prop == 'keywords' || prop == 'openingTimes') continue;
				values.push(req.body[prop]);
			}
			return db.insert(sql, [[values]]);
		})
		.then(results => {
			location_id = results.insertId;
			let sql = "INSERT INTO keywords (keyword, location_id) VALUES ?";
			let values = [];
			req.body.keywords.forEach((keyword) => {
				let value = [keyword, location_id];
				values.push(value);
			});
			return db.insert(sql, [values]);
		})
		.then(results => {
			let sql = "INSERT INTO opening_times (day, state, open, close, location_id) VALUES ?";
			let values = [];
			req.body.openingTimes.forEach((openingTime) => {
				let value = [openingTime.day, openingTime.state, openingTime.open, openingTime.close, location_id];
				values.push(value);
			});
			return db.insert(sql, [values]);
		})
		.then(results => {
			sendJsonResponse(res, 200, {err: false, msg: "Location has just added!"});
		})
		.catch(err => {
			console.error(err);
			sendJsonResponse(res, 400, {err: true, msg: err});
		});
}

module.exports.locationsReadOne = function (req, res) {
	let id = req.params.locationid;
	if (!req.params) {
		sendJsonResponse(res, 400, {err: true, msg: 'ID not found'});
		return;
	}
	let sql = `SELECT * FROM locations WHERE id="${id}"`;
	db.connect().then((connection) => {
		connection.query(sql, (err, results, fields) => {
			if (err) sendJsonResponse(res, 400, { err: true, msg: 'Cannot find location' });
			else {
				let locations = results;
				let sql2 = `SELECT * FROM keywords WHERE location_id="${id}"`;
				connection.query(sql2, (err2, results2, fields2) => {
					if (err2) sendJsonResponse(res, 400, { err: true, msg: err2 });
					else {
						let currentIndex = 0;
						locations.forEach((location) => {
							location.keywords = [];
							for (let i = currentIndex; i < results2.length; i++) {
								if (results2[i].location_id == location.id) location.keywords.push(results2[i].keyword);
								else if (results2[i].location_id > location.id) {
									currentIndex = i;
									break;
								}
							}
						});
						let sql3 = `SELECT * FROM opening_times WHERE location_id="${id}"`;
						connection.query(sql3, (err3, results3, field3) => {
							if (err3) sendJsonResponse(res, 400, { err: true, msg: err3 });
							else {
								let currentIndex = 0;
								locations.forEach((location) => {
									location.openingTimes = [];
									for (let i = currentIndex; i < results3.length; i++) {
										if (results3[i].location_id == location.id) location.openingTimes.push(results3[i]);
										else if (results3[i].location_id > location.id) {
											currentIndex = i;
											break;
										}
									}
								});
								sendJsonResponse(res, 200, locations);
							}
						});
					}
				});
			}
		});
	});
}