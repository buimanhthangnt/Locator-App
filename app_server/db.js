let mysql = require('mysql');

let pool = null;

exports.connect = function () {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'locator_app'
    });
    return new Promise((resolve, reject) => {
        resolve(pool);
    });
}
exports.insert = function (sql, values) {
    return new Promise((resolve, reject) => {
		pool.query(sql, values, (err, results, fields) => {
			if (err) return reject(err);
			else return resolve(results);
		});
	});
}