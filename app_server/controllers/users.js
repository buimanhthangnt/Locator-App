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

module.exports.usersUpdateOne = (req, res) => {
    services.authorize(req.get('jwt'))
        .then((payload) => {
            let user_id = payload.id;
            let newName = req.body['name'];
            let newEmail = req.body['email'];
            let newPassword = req.body['password'];
            let hash = services.generateHash(newPassword);
            console.log(hash.salt);
            db.connect()
                .then(() => {
                    let sql = `UPDATE users SET name = "${newName}", email = "${newEmail}", password = "${hash.password}", salt = "${hash.salt}" WHERE id = "${user_id}"`;
                    return db.insert(sql);
                })
                .then(results => {
                    services.sendSuccessResponse(res, null);
                })
                .catch(err => {
                    console.error(err);
                    services.sendFailResponse(res, err);
                });
        })
        .catch(err => {
			console.error(err);
			services.sendJsonResponse(res, 400, {err: true, msg: "" + err});
		});
}