let jwt = require('jsonwebtoken');
let config = require('../config/index');
let errors = require('../config/errors');

module.exports = function authMiddleware(req, res, next) {
  if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty(config.authHeader)) {
    try {
      req.user = jwt.verify(req.headers[config.authHeader], config.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        error: {
          msg: errors.authFailed
        }
      });
    }
  } else {
    return res.status(401).json({
      error: {
        msg: errors.noToken
      }
    });
  }
  next();
};
