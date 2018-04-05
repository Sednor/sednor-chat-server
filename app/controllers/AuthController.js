let config = require('../config/index');
let errors = require('../config/errors');

let UserDto = require('../dtos/UserDto');
let AuthService = require('../services/AuthService');

class AuthController {
  static get prefix() {
    return '/auth';
  }

  static signIn(req, res) {
    AuthService.signIn(req.body.email, req.body.password)
      .then(userDto => {
        res.set(config.authHeader, AuthService.createToken(userDto));
        res.sendStatus(200);
      })
      .catch(() => res.status(401).json({ error: { message: errors.invalidCredentials } }));
  }

  static signUp(req, res) {
    AuthService.signUp(req.body)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  }

  static current(req, res) {
    res.json(new UserDto(req.user.data));
  }
}

module.exports = AuthController;
