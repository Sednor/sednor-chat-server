let config = require('../config/index');
let errors = require('../config/errors');
let messages = require('../config/messages');

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
      .catch(err => res.status(401).json({
        error: {
          message: err === errors.notVerified ? errors.notVerified : errors.invalidCredentials
        }
      }));
  }

  static signUp(req, res) {
    AuthService.signUp(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => err === errors.alreadyInUse ? res.status(500).json({ error: { message: errors.alreadyInUse } }) : res.sendStatus(500));
  }

  static current(req, res) {
    res.json(new UserDto(req.user.data));
  }

  static verify(req, res) {
    AuthService.verifyEmail(req.params.token)
      .then(() => res.status(200).send(messages.verifiedEmail))
      .catch(err => res.status(403).send(err === messages.alreadyVerified ? messages.alreadyVerified : errors.verifyFailed));
  }
}

module.exports = AuthController;
