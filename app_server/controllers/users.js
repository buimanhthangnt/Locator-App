let db = require('../db');
let services = require('../services');

module.exports.usersReadOne = (req, res) => {
    let userJwt = req.get('jwt');
    services.authorize(userJwt)
        .then(payload => {
            db.connect()
              .then(() => {
                  let sql = `SELECT id, name, email FROM users WHERE email = "${payload.email}"`;
                  return db.select(sql);
              })
              .then(users => {
                  if (Array.isArray(users) && users.length == 1) {
                      services.sendSuccessResponse(res, users[0]);
                  } else {
                      throw new Error('Bad request');
                  }
              });
        })
        .catch(err => {
            console.error(err);
            services.sendFailResponse(res, err);
        });
}
