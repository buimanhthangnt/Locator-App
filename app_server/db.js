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
