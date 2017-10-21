let db = require('../db');
let services = require('../services');

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
			services.sendJsonResponse(res, 200, {err: false, data: locations, msg: 'Success'});
		})
		.catch(err => {
			console.error(err);
			services.sendJsonResponse(res, 400, {err: true, msg: "" + err});
		});
}

module.exports.addLocation = function (req, res) {
	db.connect()
		.then(() => {
			let sql = "INSERT INTO locations (name, type, address, rating, longitude, latitude, discount, avatar) VALUES ?"
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
			services.sendJsonResponse(res, 200, {err: false, msg: "Location has just added!"});
		})
		.catch(err => {
			console.error(err);
			services.sendJsonResponse(res, 400, {err: true, msg: "" + err});
		});
}

module.exports.locationsReadOne = function (req, res) {
	let location;
	let id = req.params.locationid;
	db.connect()
		.then(() => {
			let sql = `SELECT * FROM locations WHERE id="${id}"`;
			return db.select(sql);
		})
		.then(_locations => {
			if (_locations.length == 0) throw new Error ("No location found.");
			location = _locations[0];
			let sql = `SELECT * FROM keywords WHERE location_id="${id}"`;
			return db.select(sql);
		})
		.then(_keywords => {
			let keywords = [];
			_keywords.forEach((_keyword) => {
				keywords.push(_keyword.keyword);
			})
			location.keywords = keywords;
			let sql = `SELECT * FROM opening_times WHERE location_id="${id}"`;
			return db.select(sql);
		})
		.then(_opening_times => {
			let opening_times = [];
			_opening_times.forEach((_opening_time) => {
				opening_times.push(_opening_time);
			})
			location.opening_times = opening_times;
			services.sendJsonResponse(res, 200, {err: false, data: location, msg: 'Success'});
		})
		.catch(err => {
			console.error(err);
			services.sendJsonResponse(res, 400, {err: true, msg: "" + err});
		});
}

module.exports.addReview = function (req, res) {
	db.connect()
	.then(() => {

	});
}