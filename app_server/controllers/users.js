let db = require('../db');
let services = require('../services');

module.exports.usersReadOne = (req, res) => {
    let userJwt = req.get('jwt');
    let next = (payload) => {
        db.connect()
          .then(() => {
              let sql = `SELECT id, name, email FROM users WHERE email = "${payload.email}"`;
              return db.select(sql);
          })
          .then(users => {
              if (Array.isArray(users) && users.length == 1) {
                  services.sendJsonResponse(res, 200, {err: false, msg: 'Success', data: users[0]});
              } else {
                  throw new Error('Bad request');
              }
          })
          .catch(err => {
              console.error(err);
              services.sendJsonResponse(res, 400, {err: true, msg: '' + err});
          })
    }
    services.authorize(res, userJwt, next);
}
