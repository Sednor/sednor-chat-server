let jwt = require('jsonwebtoken');

let config = require('../config/index');
let errors = require('../config/errors');

let UserDto = require('../dtos/UserDto');

module.exports = function wsAuthMiddleware(socket, next) {
  let token = socket.handshake.query.token;

  if (!token) {
    return next(new Error(errors.noToken));
  }

  try {
    socket.user = new UserDto(jwt.verify(token, config.JWT_SECRET).data);
    return next();
  } catch (err) {
    return next(new Error(errors.authFailed));
  }
};
