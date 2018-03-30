let jwt = require('jsonwebtoken');
let config = require('../config/index');

module.exports = function authMiddleware(req, res, next) {
  if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty(config.authHeader)) {
    try {
      req.user = jwt.verify(req.headers[config.authHeader], config.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        error: {
          msg: 'Failed to authenticate token!'
        }
      });
    }
  } else {
    return res.status(401).json({
      error: {
        msg: 'No token!'
      }
    });
  }
  next();
};
