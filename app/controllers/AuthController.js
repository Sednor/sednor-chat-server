let jwt = require('jsonwebtoken');
let config = require('../config/index');
let errors = require('../config/errors');

class AuthController {
  static get prefix() {
    return '/auth';
  }

  static signIn(req, res) {
    if (req.body.email === 'admin@mail.com' && req.body.password === 'admin') {
      res.set(config.authHeader, jwt.sign({ id: 1, name: 'Vova' }, config.JWT_SECRET, { expiresIn: config.tokenExpiry }));
      res.sendStatus(200);
    } else {
      res.status(401).json({
        error: {
          message: errors.invalidCredentials
        }
      });
    }
  }

  static current(req, res) {
    res.json(req.user);
  }
}

module.exports = AuthController;
