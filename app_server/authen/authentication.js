let db = require('../db');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  db.connect()
    .then(() => {
      if (!name || !email || !password) throw new Error("All fields required!");
      let sql = `SELECT * FROM users WHERE email = "${email}"`;
      return db.select(sql);
    })
    .catch(err => {
      console.error(err);
      sendJsonResponse(res, 400, {err: true, msg: err});
    })
    .then(users => {
      if (Array.isArray(users) && users.length == 0) {
        let sql =  `INSERT INTO users (email, name, password) VALUES ("${email}", "${name}", "${password}")`;
        return db.insert(sql);
      } else {
        throw new Error("Email existed already!");
      }
    })
    .catch(err => {
      console.error(err);
      sendJsonResponse(res, 400, {err: true, msg: err});
    })
    .then(results => {
      sendJsonResponse(res, 200, {err: false, msg: "Successful registration!"});
    })
}