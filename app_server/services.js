const jwt = require('jsonwebtoken');
require('dotenv').load();

//need to check expired date
let verifyJwt = (reqToken) => {
    let payload;
    jwt.verify(reqToken, process.env.JWT_SECRET, (err, decoded) => {
        if (!err) payload = decoded;
    });
    return payload;
}

module.exports.authorize = (res, jwt, next) => {
    let payload = verifyJwt(jwt);
    if (!payload) {
        res.status(401);
        res.json({err: true, msg: 'Unauthorized'});
    } else {
        next(payload);
    }
}

module.exports.verifyJwt;

module.exports.sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
}

module.exports.sendFailResponse = (res, err) => {
  res.status(400);
  res.json({err: true, msg: '' + err});
}

module.exports.sendSuccessResponse = (res, data) => {
    res.status(200);
    res.json({err: false, msg: 'Success', data: data});
}
