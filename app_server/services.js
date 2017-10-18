const jwt = require('jsonwebtoken');
require('dotenv').load();

//need to check expired date
module.exports.verifyJwt = (reqToken) => {
    let payload;
    jwt.verify(reqToken, process.env.JWT_SECRET, (err, decoded) => {
        if (!err) payload = decoded;
    });
    return payload;
}

module.exports.responseUnauthorized = (res) => {
    res.status(401);
    res.json({err: true, msg: 'Unauthorized'});
}

module.exports.sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
}
