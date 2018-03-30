let jwt = require('jsonwebtoken');
let config = require('../config/index');

class AuthController {
  static get prefix() {
    return '/auth';
  }

  static signIn(req, res) {
    console.log(req.body); // eslint-disable-line
    if (req.body.email === 'admin@mail.com' && req.body.password === 'admin') {
      res.set(config.authHeader, jwt.sign({ id: 1, name: 'Vova' }, config.JWT_SECRET, { expiresIn: 60 * 60 }));
      res.sendStatus(200);
    } else {
      res.status(401).json({
        error: {
          message: 'Wrong username or password!'
        }
      });
    }
  }

  static current(req, res) {
    res.json(req.user);
  }
}

module.exports = AuthController;
