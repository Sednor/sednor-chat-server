let jwt = require('jsonwebtoken');

let config = require('../config/index');
let errors = require('../config/errors');

module.exports = function wsAuthMiddleware(socket, next) {
  let token = socket.handshake.query.token;

  try {
    jwt.verify(token, config.JWT_SECRET);
    return next();
  } catch (err) {
    return next(new Error(errors.authFailed));
  }
};
