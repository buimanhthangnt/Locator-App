let mysql = require('mysql');

let pool = null;
pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'hihi',
    database: 'locator_app'
});

exports.connect = function () {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
exports.insert = function (sql, values) {
    return new Promise((resolve, reject) => {
        if (!values) {
            pool.query(sql, (err, results, fields) => {
                if (err) return reject(err);
                else return resolve(results);
            });
        } else {
            pool.query(sql, values, (err, results, fields) => {
                if (err) return reject(err);
                else return resolve(results);
            });
        }
	});
}
exports.select = function (sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, results, fields) => {
            if (err) return reject(err);
            else return resolve(results);
        });
    });
}
