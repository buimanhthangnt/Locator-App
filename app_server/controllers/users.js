let db = require('../db');

let sendJsonResponse = (res, status, content) => {
  res.status(status);
  res.json(content);
}

