const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').load();

//need to check expired date
let verifyJwt = (reqToken) => {
    let payload;
    jwt.verify(reqToken, process.env.JWT_SECRET, (err, decoded) => {
        if (!err) payload = decoded;
    });
    return payload;
}

module.exports.authorize = (jwt) => {
    let payload = verifyJwt(jwt);
    return new Promise((resolve, reject) => {
        if (!payload) return reject('Unauthorized');
        else return resolve(payload);
    });
}

module.exports.generateHash = (password) => {
	let hash = {};
	hash.salt = crypto.randomBytes(16).toString('hex');
	hash.password = crypto.pbkdf2Sync(password, hash.salt, 1000, 64, 'sha1').toString('hex');
	return hash;
}

module.exports.generateJwt = (id, email, name) => {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		id: id,
		email: email,
		name: name,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
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
